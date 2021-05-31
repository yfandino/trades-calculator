import { InfoPill } from "../Common";

function Wallet({ wallet, selectedPair }) {
  if (!selectedPair || !wallet) return <div></div>;

  const asset = wallet.find(e => selectedPair.indexOf(e.asset) !== -1);
  const total = parseFloat(asset.free) + parseFloat(asset.locked);
  const ITEMS = [
    { title: "Total", value: total },
    { title: "Libre", value: asset.free },
    { title: "Bloqueado", value: asset.locked }
  ];

  return (
    <InfoPill title="Balance" columns={ITEMS} />
  );
}

export default Wallet;