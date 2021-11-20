import {
  Gift,
  Player,
  Resource,
  ResourceType,
  useFetchGifts,
  useFetchLatestGifts,
  useFetchPlayer,
  useFetchPlayers,
  useFetchResources,
  useSendGift,
} from "@generated";
import Button from "components/Button";
import Header from "components/Header";
import Input from "components/Input";
import { InputHook, useInput } from "hooks/useInput";

import React, { ReactNode } from "react";
import "./styles.css";

const List: React.FC<{
  items: { id: any }[];
  children: (item: any) => ReactNode;
}> = (props) => {
  const { items, children } = props;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{children(item)}</li>
      ))}
    </ul>
  );
};

const resourceTypeNameMap: Record<ResourceType, string> = {
  CRYSTAL: "Кристаллы",
  GOLD: "Золото",
  BTC: "Биткоин",
  LOVE: "Любовь",
  ETH: "Эфир",
  LIFE: "Жизнь",
};

const resourceTypeNameMapper = (type: ResourceType) =>
  resourceTypeNameMap[type] ?? `Неизвестный ресурс (${type})`;

const ResourceItem: React.FC<{
  item: Resource;
}> = (props) => {
  const { item } = props;

  return (
    <div className="item resource-item">
      <span> {resourceTypeNameMapper(item.resourceType)}:</span>
      <span className="amount"> {item.amount} </span>
    </div>
  );
};

const ResourcesTab: React.FC<{
  player: { id: string; username: string } | null;
}> = (props) => {
  const { player } = props;
  const { data: items } = useFetchResources(
    { id: player?.id ?? "" },
    { enabled: player !== null }
  );
  const resources = (items?.resources ?? []).map((item) => ({
    id: item.resourceType,
    ...item,
  }));
  return (
    <section style={{ marginBottom: "1rem" }}>
      <Header label="Общие ресурсы игрока (с подарками)" />
      <List items={resources}>
        {(item: Resource) => <ResourceItem item={item} />}
      </List>
    </section>
  );
};

const PlayerItem: React.FC<{
  item: Player;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}> = (props) => {
  const { item, isSelected, onSelect } = props;
  return (
    <Button
      onClick={() => onSelect(item.id)}
      className={(isSelected ? "selected" : "") + " player-item"}
    >
      {item.username}
    </Button>
  );
};

const PlayersTab: React.FC<{
  bind: InputHook;
}> = (props) => {
  const { bind } = props;
  const selectedId = bind.input.id;
  const { data: items } = useFetchPlayers();
  const players = items?.players ?? [];
  return (
    <section>
      <Header label="Список игроков" />
      <Input {...bind} name="id" placeholder="ID игрока" />
      <List items={players}>
        {(item: Player) => (
          <PlayerItem
            item={item}
            isSelected={item.id === selectedId}
            onSelect={(id) =>
              bind.onChange({ target: { name: "id", value: id } })
            }
          />
        )}
      </List>
    </section>
  );
};

const GiftSendTab: React.FC<{
  player: { id: string; username: string } | null;
}> = (props) => {
  const { player } = props;
  const { data: items } = useFetchPlayers();
  const players = items?.players ?? [];

  const bind = useInput({
    targetId: "",
    resourceType: "GOLD",
    amount: "0",
  });

  const { mutate: sendGift, isError, isSuccess, error } = useSendGift();

  React.useEffect(() => {
    if (!isError) return;

    const e = error as Error;
    alert(e.message);
  }, [isError]);

  React.useEffect(() => {
    if (!isSuccess) return;

    alert("Успешно отправлен");
  }, [isSuccess]);

  const amount = Number(bind.input.amount);

  return (
    <section className="tab__gift-send">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!player) return;
          const { targetId, resourceType } = bind.input;
          sendGift({
            amount,
            targetId,
            type: resourceType as ResourceType,
            authorId: player?.id,
          });
        }}
      >
        <Header
          label={
            player
              ? `Отправка подарка от имени (${player.username})`
              : "Выберите игрока для отправки подарка"
          }
        />
        {/* <Input {...bind} name="targetId" placeholder="ID получателя" /> */}
        <label>
          Получатель
          <select {...bind} name="targetId">
            {players.map((player) => (
              <option value={player.id}>{player.username}</option>
            ))}
          </select>
        </label>
        <label>
          Ресурс
          <select {...bind} name="resourceType">
            {Object.entries(resourceTypeNameMap).map(([type, name]) => (
              <option value={type}>{name}</option>
            ))}
          </select>
        </label>
        <Input {...bind} name="amount" placeholder="Количество" type="number" />
        <Button
          disabled={!player || isNaN(amount) || amount <= 0}
          role="sumbit"
        >
          Отправить
        </Button>
      </form>
    </section>
  );
};

const GiftItem: React.FC<{
  item: Gift;
}> = (props) => {
  const { item } = props;
  const { data: items } = useFetchPlayers();

  const getPlayer = (id: string) =>
    items?.players.find((player) => player.id === id);

  return (
    <div className="item gift-item">
      <span>
        {resourceTypeNameMapper(item.resourceType) + " "}
        <strong> {item.amount} ед.</strong>
      </span>
      <small className="gift-item__time">
        {`${new Date(item.createdAt).toTimeString().split(/\s+/)[0]} | ${
          getPlayer(item.authorId)?.username ?? "..."
        } -> ${getPlayer(item.targetId)?.username ?? "..."}`}
      </small>
    </div>
  );
};
const GiftsTab: React.FC<{ player: { username: string; id: string } | null }> =
  (props) => {
    const { player } = props;
    const { data: items } = useFetchGifts(
      { id: player?.id ?? "" },
      { enabled: player !== null }
    );
    const gifts = (items?.gifts ?? []).map((item) => ({
      id: item.resourceType,
      ...item,
    }));
    return (
      <section>
        <Header label="Подарки игрока" />
        <List items={gifts}>{(item: Gift) => <GiftItem item={item} />}</List>
      </section>
    );
  };

const LatestGiftsTab: React.FC<{}> = (props) => {
  const { data: items } = useFetchLatestGifts();
  const gifts = (items?.latestGifts ?? []).map((item) => ({
    id: item.resourceType,
    ...item,
  }));
  return (
    <section>
      <Header label="Последние выписанные подарки (за минуту)" />
      <List items={gifts}>{(item: Gift) => <GiftItem item={item} />}</List>
    </section>
  );
};

const RootLayout: React.FC<{}> = (props) => {
  const resourcesBind = useInput({ id: "" });

  const { data } = useFetchPlayer({ id: resourcesBind.input.id });
  const player = data?.player ?? null;

  return (
    <main className="page">
      <div className="tab__player-control">
        <PlayersTab bind={resourcesBind} />
        <GiftSendTab player={player} />
      </div>
      {player && (
        <div className="tab__player-resources">
          <ResourcesTab player={player} />
          <GiftsTab player={player} />
        </div>
      )}
      <div className="tab__resources-log">
        <LatestGiftsTab />
      </div>
    </main>
  );
};

export default RootLayout;
