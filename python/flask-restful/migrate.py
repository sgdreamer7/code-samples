from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from models import db
from run import create_app

app = create_app('settings')

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    try:
        manager.run()
    except Exception as e:
        print(e)
