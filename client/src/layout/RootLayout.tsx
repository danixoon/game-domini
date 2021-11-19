import {
  Player,
  Resource,
  useFetchPlayer,
  useFetchResources,
} from "@generated";
import Button from "components/Button";
import Input from "components/Input";
import { useInput } from "hooks/useInput";

import React from "react";

const ResourcesList: React.FC<{ items: Omit<Resource, "playerId">[] }> = (
  props
) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.resourceType}>
          <label className="label"> {item.resourceType} </label>
          <span className="amount"> {item.amount} </span>
        </li>
      ))}
    </ul>
  );
};

const RootLayout: React.FC<{}> = (props) => {
  const bind = useInput({ id: "" });
  const { data: items } = useFetchResources({ id: bind.input.id });

  return (
    <main className="page">
      <section>
        <Input {...bind} name="id" placeholder="ID игрока" />
        <Button onClick={() => {}}> Ресурсы </Button>
        <ResourcesList items={items?.resources ?? []} />
      </section>
      <section>
        <Input {...bind} name="id" placeholder="ID игрока" />
        <Button onClick={() => {}}> Ресурсы </Button>
        <ResourcesList items={items?.resources ?? []} />
      </section>
      <section>
        <Input {...bind} name="id" placeholder="ID игрока" />
        <Button onClick={() => {}}> Ресурсы </Button>
        <ResourcesList items={items?.resources ?? []} />
      </section>
    </main>
  );
};

export default RootLayout;
