import IndexButton from "./IndexButton";
import { useState } from "react";

interface IndexAction {
  onClick: () => void;
}

interface IndexButtonsGenerateProps {
  generate: IndexAction[];
}

export const IndexButtonGenerate = ({ generate }: IndexButtonsGenerateProps) => {
  const [active, setActive] = useState(0);

  const click = (index: number, action: IndexAction) => {
    setActive(index);
    action.onClick()// Chama a função onClick passada
  };

  return (
    <>
      {generate.length > 0 && (
        generate.map((action, index) => (
          <IndexButton
            key={index}
            onClick={() => click(index, action)}
            title={index}
            state={active}
          />
        ))
      )}
    </>
  );
};

export default IndexButtonGenerate;
