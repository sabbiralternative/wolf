import HorseGreyhound from "../../components/ui/HorseGreyhound/HorseGreyhound";
import useSportsBook from "../../hooks/useSportsBook";

const HorseRacing = () => {
  const { sports } = useSportsBook(7);
  console.log(sports);
  return <HorseGreyhound data={sports} title="Horse Racing" eventTypeId={7} />;
};

export default HorseRacing;
