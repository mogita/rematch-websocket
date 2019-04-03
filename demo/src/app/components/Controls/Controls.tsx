import * as React from 'react';
import Button from '../Button';

import exampleMessages from './exampleMessages';

import {
  ConnectedStatusIndicator,
  ConnectButton,
  Container,
  DisconnectButton,
  DisconnectedStatusIndicator,
  ExampleMessageDropDown,
  Input,
  InputGroup,
  Label,
  TextArea,
  SimulateDisconnectButton,
  StatusContents,
} from './styles';

interface Props {
  connected: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
  onSendMessage: (message: string) => void;
}

interface State {
  message: string;
  webSocketUrl: string;
}

class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: exampleMessages[0].value,
      webSocketUrl: 'wss://websocket-echo-server.herokuapp.com',
    };
  }

  componentDidMount() {
    const { connect } = this.props;
    const { webSocketUrl } = this.state;
    connect(webSocketUrl);
  }

  handleExampleMessageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({ message: value });
  }

  handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    this.setState({ message: value });
  }

  handleSendMessage = () => {
    const { onSendMessage } = this.props;
    const { message } = this.state;

    try {
      onSendMessage(JSON.parse(message));
    } catch {
      alert('Please enter valid JSON!');
    }
  }

  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ webSocketUrl: value });
  }

  render() {
    const { connect, connected, disconnect } = this.props;
    const { message, webSocketUrl } = this.state;

    return (
      <Container>
        <InputGroup>
          <Label>
            Server
            <Input
              type="text"
              placeholder="Input server URL here…"
              onChange={this.handleUrlChange}
              value={webSocketUrl}
            />
          </Label>
        </InputGroup>

        <InputGroup>
          <Label>Status</Label>

          <StatusContents>
            <ConnectedStatusIndicator
              active={connected}
              text="Connected"
            />

            <DisconnectedStatusIndicator
              active={!connected}
              text="Disconnected"
              type="WARN"
            />

            <ConnectButton
              disabled={connected}
              onClick={() => connect(webSocketUrl)}
            >
              Connect
            </ConnectButton>

            <DisconnectButton
              disabled={!connected}
              onClick={disconnect}
            >
              Disconnect
            </DisconnectButton>

            <SimulateDisconnectButton onClick={() => alert('Not implemented yet!')}>
              Simulate Disconnect
            </SimulateDisconnectButton>
          </StatusContents>
        </InputGroup>

        <InputGroup>
          <Label>
            Example Messages

            <ExampleMessageDropDown
              options={exampleMessages}
              onChange={this.handleExampleMessageChange}
            />
          </Label>

          <TextArea
            onChange={this.handleMessageChange}
            placeholder="Input JSON formated message here…"
            value={message}
            rows={10}
          />

          <Button onClick={this.handleSendMessage}>
            Send message
          </Button>
        </InputGroup>
      </Container>
    );
  }
}

export default Controls;
