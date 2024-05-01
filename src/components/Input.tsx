import { FC, useState } from "react";
import { Icon, Input, InputProps } from "semantic-ui-react";

interface AppInputProps extends InputProps {}

const AppInput: FC<AppInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      fluid
      size="large"
      icon={
        props.type == "password" ? (
          <Icon
            onClick={toggleShowPassword}
            name={showPassword ? "eye slash" : "eye"}
            link
          />
        ) : (
          props.icon
        )
      }
      {...props}
      type={showPassword ? "text" : props.type}
    />
  );
};

export default AppInput;
