import React, { useEffect, useState } from "react";
import getBalance from "./getBalance";
import tokenData from "./tokenData";
import MetamaskButton from "./Metamask";
import DataTable from "./DataTable";
import "../../css/Widget.css";

const LeaderboardWidget = () => {
  const [clientAddress, setClientAddress] = useState<string>("");
  const [connection, setConnection] = useState<boolean>(false);
  const [balances, setBalances] = useState<string[]>([]);

  useEffect(() => {
    if (!connection || !clientAddress) return;
    (async () => {
      // Returns list of balances
      let newBalances = await Promise.all(
        Object.entries(tokenData).map(async ([, data]) => {
          return await getBalance(data.address, clientAddress);
        })
      );
      // Set new balance
      setBalances(newBalances);
    })();
  }, [connection, clientAddress]);

  return (
    <div className="leaderboard-container">
      {connection ? (
        <DataTable
          address={clientAddress}
          tokenBalance={balances}
          setAddress={setClientAddress}
        />
      ) : (
        <MetamaskButton
          setAddress={setClientAddress}
          setConnection={setConnection}
        />
      )}
    </div>
  );
};

export default LeaderboardWidget;
