import { Button, Space } from "antd";
import Router from "next/router";

import SearchCard from "../components/SearchCard";

export default function Home() {
  return (
    <div className="wrapper">
      <br />
      <SearchCard />
      <Space direction="vertical">
        <br />
        <Button type="primary" size="large" onClick={() => Router.push("/map")}>Klikk her for å gå til kartvisning</Button>
        <Button type="primary" size="large" onClick={() => Router.push("/results")}>Klikk her for å gå til listevisning</Button>
      </Space>
    </div>
  )
}
