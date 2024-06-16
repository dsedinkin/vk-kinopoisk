import { classNames } from "engine/utils";

import { Div, Button } from "@vkontakte/vkui";

import "./CustomModalPageFooter.css";

interface ICustomModalPageFooter extends React.HTMLAttributes<HTMLDivElement> {
  disabled: boolean;
  mode: string;
  onAddClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  textAddButton: string;
  textEditButton: string;
}

const CustomModalPageFooter: React.FC<ICustomModalPageFooter> = ({
  disabled,
  mode,
  onAddClick,
  onDeleteClick,
  onEditClick,
  textAddButton,
  textEditButton,
  className,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={classNames("CustomModalPageFooter", className)}
    >
      {mode === "add" ? (
        <Div className="CustomModalPageFooter__add">
          <Button onClick={onAddClick} disabled={disabled}>
            {textAddButton}
          </Button>
        </Div>
      ) : (
        <></>
      )}
      {mode === "edit" ? (
        <Div className="CustomModalPageFooter__edit">
          <Button onClick={onDeleteClick} appearance="negative" mode="link">
            Удалить
          </Button>
          <Button onClick={onEditClick} disabled={disabled}>
            {textEditButton}
          </Button>
        </Div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomModalPageFooter;
