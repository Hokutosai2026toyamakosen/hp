import React from "react";
import "@/components/webapp/App.css";
import Settings from "@/components/webapp/components/Misc/Settings";
import { CardBase, CardInside, SubList } from "@/components/webapp/components/Layout/CardComp";
import useContexts from "@/components/webapp/scripts/Data/Contexts";

function cardMake(title: string, children: React.ReactNode) {
  return (
    <CardBase title={title}>
      <CardInside className="no-vertical-padding">
        <SubList>
          <div className="cardRight othercardtext">{children}</div>
        </SubList>
      </CardInside>
    </CardBase>
  );
}

export default function Other() {
  const { CardTitleContexts, InfoContexts } = useContexts();

  return (
    <div className="drawerBar">
      <Settings />
      {cardMake(CardTitleContexts.Info, [
        <h4 className="lastText" key="version" style={{ textAlign: "left" }}>
          {InfoContexts.UpdateTitle} {InfoContexts.UpdateVersion}
        </h4>,
      ])}
    </div>
  );
}
