/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import useContextState from "../../hooks/useContextState";
import axios from "axios";
import { API } from "../../api";
import BetTable from "../../components/ui/BetTable/BetTable";
import { GoClock } from "react-icons/go";
import InPlay from "../../components/ui/BetTable/InPlay";
import handleDecryptData from "../../utils/handleDecryptData";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";

const Sports = () => {
  const { valueByLanguage } = useLanguage();
  const { sportsType, setSportsType } = useContextState();
  const [games, setGames] = useState(null);
  const [categories, setCategories] = useState([]);
  const eventName = {
    4: languageValue(valueByLanguage, LanguageKey.CRICKET),
    2: languageValue(valueByLanguage, LanguageKey.TENNIS),
    1: languageValue(valueByLanguage, LanguageKey.FOOTBALL),
    5: languageValue(valueByLanguage, LanguageKey.KABADDI),
  };
  /* Get game events */
  useEffect(() => {
    const gameData = async () => {
      if (sportsType !== null) {
        const apiUrl = `${API.groupSportsBook}/${sportsType}`;
        const res = await axios.get(apiUrl, {
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        });
        const data = res.data;
        const decryptionData = await handleDecryptData(JSON.stringify(data));

        setGames(decryptionData);
      }
    };
    gameData();
    /* Refetch after 600 millisecond */
    if (
      sportsType === 0 ||
      sportsType === 4 ||
      sportsType === 1 ||
      sportsType === 2 ||
      sportsType === 5
    ) {
      const intervalId = setInterval(gameData, API.interval);
      return () => clearInterval(intervalId);
    }
  }, [sportsType]);

  /* get category for games */
  useEffect(() => {
    if (games) {
      /* create a array with all unique category for games */
      const categories = Array.from(
        new Set(
          Object.values(games)
            .filter((item) => item.visible) // Only include items where visible is true
            .map((item) => item.eventTypeId)
        )
      );
      /* Sort the category for cricket > tennis > football */
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 2: 1, 1: 2, 5: 3 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [games]);

  if (!games) {
    return;
  }

  return (
    <div _ngcontent-ng-c943649379="" className="cricket-tab ng-star-inserted">
      {sportsType === 0 ? (
        categories?.map((category) => {
          /* filter games by category  */
          const filteredData = Object.entries(games)
            .filter(([, value]) => value.eventTypeId === category)
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
          return (
            <div key={category}>
              <div _ngcontent-ng-c943649379="" className="game-play-heading">
                <h2 _ngcontent-ng-c943649379="">{eventName[category]}</h2>

                <a
                  _ngcontent-ng-c943649379=""
                  routerlinkactive="active-link"
                  className="view-all-link ng-star-inserted"
                  onClick={() => setSportsType(category)}
                >
                  {languageValue(valueByLanguage, LanguageKey.VIEW_ALL)}
                </a>
              </div>
              {games &&
              Object.values(games).length > 0 &&
              (sportsType || sportsType === 0)
                ? Object.keys(filteredData)
                    .sort((keyA, keyB) => games[keyA].sort - games[keyB].sort)
                    .map((key, index) => {
                      return <InPlay key={index} keys={key} data={games} />;
                    })
                : null}
            </div>
          );
        })
      ) : (
        <>
          <div _ngcontent-ng-c943649379="" className="game-play-heading">
            <h2 _ngcontent-ng-c943649379="">{eventName[sportsType]}</h2>

            {/* <a
              _ngcontent-ng-c943649379=""
              routerlinkactive="active-link"
              className="view-all-link ng-star-inserted"
              href=""
            >
              View All
            </a> */}
          </div>
          {games &&
          Object.values(games).length > 0 &&
          (sportsType || sportsType === 0)
            ? Object.keys(games)
                .filter((key) => games[key].visible)
                .sort((keyA, keyB) => games[keyA].sort - games[keyB].sort)
                .map((key, index) => {
                  return <InPlay key={index} keys={key} data={games} />;
                })
            : null}
        </>
      )}

      {sportsType !== 0 && (
        <div
          _ngcontent-ng-c943649379=""
          className="cricket-table notranslate ng-star-inserted"
        >
          <div _ngcontent-ng-c943649379="" className="table-header">
            <h3 _ngcontent-ng-c943649379="" className="card-title">
              <mat-icon
                _ngcontent-ng-c943649379=""
                role="img"
                className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                aria-hidden="true"
                data-mat-icon-type="font"
              >
                <GoClock />
              </mat-icon>
              Upcoming Matches
            </h3>
            <div _ngcontent-ng-c943649379="" className="lay-back-wrap">
              {/* <h3 _ngcontent-ng-c943649379="" className="back-bg">
              Back
            </h3>
            <h3 _ngcontent-ng-c943649379="" className="lay-bg">
              Lay
            </h3> */}
            </div>
          </div>
          <div _ngcontent-ng-c943649379="" className="table-body">
            {games && Object.values(games).length > 0
              ? Object.keys(games)
                  .filter((key) => games[key].visible)
                  .sort((keyA, keyB) => games[keyA].sort - games[keyB].sort)
                  .map((key, index) => (
                    <BetTable key={index} keys={key} data={games} />
                  ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sports;
