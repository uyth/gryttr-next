import { Container } from '@material-ui/core/';
import { Button, Space } from "antd";

export default function Home() {
  return (
    <Container>
      <br />
      <Space>
        <Button type="primary" size="large" href="/map">Klikk her for å gå til kartvisning</Button>
        <Button type="primary" size="large" href="/results">Klikk her for å gå til listevisning</Button>
      </Space>
    </Container>
  )
}
