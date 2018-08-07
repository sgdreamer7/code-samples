import Select from 'antd/lib/select';
import FormItem from 'antd/lib/form/FormItem';

/**
 * Биндинги для селектов между react-final-form / redux-form и AntDesign
 * Часть кода взята с https://github.com/zhDmitry/redux-form-antd
 *
 * @TODO(alex_kazantsev): Проверсти рефакторинг, проверить наличие всех необходимых методов и функционала;
 *    в частности - есть ли биндинги на валидацию.
 */

function createComponent(AntdComponent, mapProps) {
  class InputComponent extends React.PureComponent {
    getRenderedComponent() {
      return this.componentRef;
    }

    initComponentRef = (r) => {
      this.componentRef = r;
    };

    render() {
      const {
        label, labelCol, wrapperCol, help, extra, validateStatus, hasFeedback = true, colon, required,
        ...rest
      } = mapProps(this.props);

      return (
        <FormItem
          label={label}
          ref={this.initComponentRef}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          help={help}
          hasFeedback={hasFeedback}
          extra={extra}
          validateStatus={validateStatus}
          colon={colon}
          required={required}
        >
          <AntdComponent {...rest} />
        </FormItem>
      );
    }
  }
  InputComponent.displayName = `Redux-form-ANTD${AntdComponent.displayName}`;

  return InputComponent;
}

const withOptions = OptionType => Component =>
  class extends React.PureComponent {
    initContainerRef = (r) => {
      this.container = r;
    };
    getContainerRef = () => this.container;
    render() {
      const { options } = this.props;

      return (
        <div>
          <div ref={this.initContainerRef} />
          <Component getPopupContainer={this.getContainerRef} {...this.props}>
            {options.map(({ value, label, ...rest }, key) => (
              <OptionType {...rest} key={key} value={String(value)}>
                {label}
              </OptionType>
            ))}
          </Component>
        </div>
      );
    }
  };

const _SelectField = withOptions(Select.Option)(Select);

const getValidateStatus = (touched, error, warning, valid) => {
  if (touched) {
    if (error) return 'error';
    if (warning) return 'warning';
    // if (valid) return "success";
  }
  return '';
};

const mapError = ({
  meta: {
    touched, error, warning, valid,
  } = {},
  input: { ...inputProps },
  ...props
}) => ({
  ...props,
  ...inputProps,
  validateStatus: getValidateStatus(touched, error, warning, valid),
  help: touched && (error || warning),
});

const customMap = customPropsFun => props => (
  [props].reduce(customPropsFun || (mappedProps => mappedProps), mapError(props))
);

const selectFieldMap = customMap((mapProps, {
  onChange, value, multiple, options, placeholder,
}) => {
  if (!placeholder && (options && options.length > 0)) {
    value = value || (multiple ? [options[0].value] : options[0].value);
  }
  if (placeholder) {
    value = value === '' ? undefined : value;
  }
  return {
    ...mapProps, dropdownMatchSelectWidth: true, value, style: { minWidth: 200 },
  };
});

export const SelectBindings = createComponent(_SelectField, selectFieldMap);
