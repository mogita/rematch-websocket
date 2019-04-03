import styled, { css } from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';
import Button from '../Button';
import DropDown from '../DropDown';
import StatusIndicator from '../StatusIndicator';

const sharedInputStyles = css`
  ${Typography.TypeStyleStark}
  background-color: ${Colors.NEPTUNE};
  border: none;
  border-radius: 3px;
  color: ${Colors.SUN};
  line-height: 16px;
  outline: none;

  &::placeholder {
    color: ${Colors.CUPID};
  }
`;

export const Container = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
`;

export const ExampleMessageDropDown = styled(DropDown)`
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  margin-bottom: 10px;
  padding: 10px;
  resize: vertical;
  width: 100%;
`;

export const Input = styled.input`
  ${sharedInputStyles}
  display: block;
  margin-top: 5px;
  padding: 5px 10px;
  width: 100%;
`;

export const InputGroup = styled.div`
  margin-bottom: 35px;
`;

export const Label = styled.label`
  ${Typography.TypeStyleDeneb};
  color: ${Colors.NIX};
  text-transform: uppercase;
`;

export const StatusContents = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: auto auto;
  grid-template-areas:
    'a a b c'
    'd d e e';
  margin-top: 10px;
`;

export const ConnectedStatusIndicator = styled(StatusIndicator)`
  grid-area: a;
`;

export const DisconnectedStatusIndicator = styled(StatusIndicator)`
  grid-area: d;
`;

export const ConnectButton = styled(Button)`
  grid-area: b;
`;

export const DisconnectButton = styled(Button)`
  grid-area: c;
`;

export const SimulateDisconnectButton = styled(Button)`
  grid-area: e;
`;
