import { useEffect, useState } from 'react';
import './App.css';
import { OfferCard, offerData } from './components/OfferCard';
import { Offer } from './models/Offer';
import { ModalFilters } from './components/ModalFilters';
import {
  getOffersByProps,
  getOfferById,
  Item,
} from './services/Infojobs.service';
import { OfferHistory } from './components/OfferHistory';

//ttps://www.figma.com/community/file/1239958249701816228
// https://developer.infojobs.net/

function App() {
  const [offersList, setOffersList] = useState<Item[]>([]);
  const [offerShowed, setOfferShowed] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [actualLeftOffer, setActualLeftOffer] = useState<Offer>();
  const [actualRigthOffer, setActualRigthOffer] = useState<Offer>();
  const [actualIndexOffer, setActualIndexOffer] = useState<number>(1);

  useEffect(() => {
    console.log({ actualLeftOffer, actualRigthOffer });
  }, [actualLeftOffer, actualRigthOffer]);

  const searchModalCallback = (filters: any): void => {
    console.log('searchModalCallback', filters);

    getOffersByFormFilters(filters.keywords);
    setShowModal(false);
  };

  function getOffersByFormFilters(q: string) {
    getOffersByProps({ query: q, expMin: '', salaryMin: '' }).then((offers) => {
      console.log({ offers });
      if (offers.totalResults > 0) {
        setOffersList(offers.items);
        setInfoOfferById(offers.items[0].id, true);
        setInfoOfferById(offers.items[1].id, false);
      }
    });
  }

  function setInfoOfferById(id: string, isLeftOffer: boolean) {
    getOfferById(id).then((offerById) => {
      const offerToSet = offerById as Offer;

      if (isLeftOffer) setActualLeftOffer(offerToSet);
      else setActualRigthOffer(offerToSet);

      const actIndex = actualIndexOffer;
      setActualIndexOffer(actIndex + 1);
    });
  }

  function setNewOffer(offerChoosed: offerData) {
    const newId = offersList[actualIndexOffer].id;
    const newOfferToShow = offersList.find((x) => x.id === newId);
    const offerItemSelected = offersList.find(
      (x) => x.id === offerChoosed.data.id
    );

    if (newOfferToShow) {
      setInfoOfferById(newId, !offerChoosed.isLeft);

      let offersShowed: Item[] = [];

      const offerInHistory = offerShowed.find(
        (x) => x.id === offerChoosed.data.id
      );

      const idOfferDismissed = offerChoosed.isLeft
        ? actualRigthOffer?.id
        : actualLeftOffer?.id;

      const offerDismissed = offersList.find((x) => x.id === idOfferDismissed);
      const offerDismissInHistory = offerShowed.find(
        (x) => x.id === idOfferDismissed
      );

      if (offerInHistory) {
        offerInHistory.score += 1;
        offersShowed = [...offerShowed, offerDismissed];
      } else {
        if (offerItemSelected) {
          let maxScore = getTopOffer()?.score;
          console.log({ maxScore });
          maxScore = maxScore ? maxScore : 0;
          offerItemSelected.score += maxScore + 1;
          if (!offerDismissInHistory) {
            offersShowed = [...offerShowed, offerItemSelected, offerDismissed];
          } else {
            offersShowed = [...offerShowed, offerItemSelected];
          }
        }
      }
      setOfferShowed(offersShowed);
    }
  }

  function orderHistory(): Item[] {
    return offerShowed.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  //Todo: Refactor
  function getTopOffer(): Item {
    return orderHistory()[0];
  }

  return (
    <main>
      {showModal && (
        <ModalFilters clickFunction={searchModalCallback}></ModalFilters>
      )}

      <div className='row h-[8%]'>
        <nav className='w-full pl-6'>
          <img
            className='pt-4 inline-block'
            width={38}
            src='/logo.svg'
            alt='mini-logo-infojobs'
          />
          <img
            className='pt-6 pl-6 inline-block'
            src='/text-logo.svg'
            alt='infojobs'
          />
          <span className='pt-3 pl-10 inline-block'>Comparador de ofertas</span>
        </nav>
      </div>
      <div className='page w-full m-0'>
        <div className='column'>
          <div className='h-[90%] max-h-screen overflow-y-auto pr-2'>
            SIDEBAR
            <p>
              {actualIndexOffer} / {offersList.length}
            </p>
            {orderHistory().map((offer) => {
              return (
                <OfferHistory
                  key={offer.id}
                  data={offer}
                  idTop={getTopOffer()?.id}
                ></OfferHistory>
              );
            })}
          </div>
        </div>
        <div className='column'>
          <OfferCard
            data={actualLeftOffer}
            isLeft={true}
            callbackChoose={setNewOffer}
            idTop={getTopOffer()?.id}
          ></OfferCard>
        </div>
        <div className='column'>
          <OfferCard
            data={actualRigthOffer}
            isLeft={false}
            callbackChoose={setNewOffer}
            idTop={getTopOffer()?.id}
          ></OfferCard>
        </div>
      </div>
    </main>
  );
}

export default App;
