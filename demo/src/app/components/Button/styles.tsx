import { lighten } from 'polished';
import styled, { css } from 'styled-components';

import * as Typography from '../../styles/js/typography';
import Colors from '../../styles/js/colors';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  small: boolean,
  outlined: boolean,
}

const outlinedStyle = css`
  background-color: transparent;
  box-shadow: inset 0 0 0 2px ${Colors.MARS};
  color: ${Colors.NIX};
  border-radius: 3px;

  &:hover {
    background-color: ${lighten(0.02, Colors.MARS)};
    box-shadow: inset 0 0 0 2px ${lighten(0.02, Colors.MARS)};
    color: ${Colors.SUN};
  }
`;

const smallStyle = css`
  ${Typography.TypeStyleCassiopeia}
  padding: 5px 10px;
`;

export default styled.button<Props>`
  ${Typography.TypeStyleArcturus}
  background-color: ${Colors.MARS};
  border-radius: 2px;
  border: none;
  color: ${Colors.SUN};
  display: inline-block;
  flex: 0 0;
  outline: none;
  padding: 7px 15px 6px 15px;
  text-transform: uppercase;
  transition-property: background-color, color;
  transition: 0.1s ease-in-out;
  user-select: none;

  &:hover {
    background-color: ${lighten(0.02, Colors.MARS)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Colors.QUARK};
    color: ${Colors.JULIET};
  }

  ${props => (props.outlined ? outlinedStyle : null)};
  ${props => (props.small ? smallStyle : null)};
`;
