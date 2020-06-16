import { Container } from '@material-ui/core/';
import { Button, Space } from "antd";

export default function Home() {
  return (
    <Container>
      <Space>
        <Button type="main" href="/map">Klikk her for å gå til kartvisning</Button>
        <Button type="main" href="/results">Klikk her for å gå til listevisning</Button>
      </Space>
    </Container>
  )
}
