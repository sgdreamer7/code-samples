@celery.task(name='tasks.refund_if_past_deadline')
def refund_if_past_deadline():
    """ 
    If photo job is two days past deadline and not approved - refund payment
    to the agent 
    """

    two_days_past_now = datetime.datetime.utcnow() + datetime.timedelta(days=2)
    for bpo in Bpo.objects(due_date__lte=two_days_past_now, approved__ne=True):
        if bpo.stripe_charge_id:
            refund = stripe.Refund.create(charge=bpo.stripe_charge_id, amount=int(bpo.buyer_fee * 100))
            if bpo.buyer_on_credit:
                credit_transaction = CreditTransaction.objects(bpo=bpo.id).first()
                if credit_transaction is not None:
                    credit_transaction.paid = True
                    credit_transaction.refund = True
                    credit_transaction.save()

@celery.task(name='tasks.send_hourly_emails')
def send_hourly_emails():
    """ 
    Sending hourly emails to drivers if job due within 4 hours 
    """

    for driver in User.objects(account_type='driver'):
        try:
            now = datetime.datetime.utcnow()
            for bpo in Bpo.objects(Q(driver_due_date__gt=now) & Q(driver_due_date__lte=now+datetime.timedelta(hours=4)),
                                   driver=driver.id, approved=False):
                msg_type = 'driver_warning'
                hours = round(((bpo.driver_due_date - now).seconds)/60)
                relevant_object = {
                    'hours': hours,
                    'address': bpo.address,
                }
                driver.notify(msg_type=msg_type,
                              relevant_object=relevant_object,
                              recipients=[driver.email],
                              user=driver,
                              bpo=bpo)
                current_app.logger.info('Notified {0} about {1}'.format(driver.email, msg_type))
        except Exception as e:
            raise e


@celery.task(name='tasks.update_job_cap')
def update_job_cap():
    """ 
    Updating (increasing) drivers job cap if they've completed a number of 
    orders over several weeks
    """

    for driver in User.objects(account_type='driver'):
        now = datetime.datetime.utcnow()
        try:
            bpo_quantity = Bpo.objects(Q(driver_due_date__gte=now - datetime.timedelta(days=14)) & Q(driver_due_date__lte=now),
                                       driver=driver.id, approved=True).count()
            if bpo_quantity >= 10:
                driver._update('job_accept_cap', 10)
        except Exception as e:
            raise e