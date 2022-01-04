import { darken, transparentize } from "polished";
import styled from "styled-components";

interface RadioBoxProps {
  isActive: boolean;
  radioBoxType: string;
}

type RadioBoxType = "income" | "outcome";

const colors = {
  income: "#33CC95",
  outcome: "#E52E4D",
};

export const RadioBox = styled.button<RadioBoxProps>`
  background: ${({ isActive, radioBoxType }) =>
    isActive
      ? transparentize(0.9, colors[radioBoxType as RadioBoxType])
      : "transparent"};

  border: 1px solid var(--input-border);

  transition: border 0.2s;

  &:hover {
    border: 1px solid ${darken(0.1, "#D7D7D7")};
  }
`;
