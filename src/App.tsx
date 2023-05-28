import { useEffect, useState } from 'react';
import './App.css';
import { OfferCard, offerData } from './components/OfferCard';
import { Offer } from './models/Offer';
import { ModalFilters } from './components/ModalFilters';
import {
  getOffersByProps,
  getOfferById,
  getExpDictionary,
  Item,
  ExperienceDictionary,
} from './services/Infojobs.service';
import { OfferHistory } from './components/OfferHistory';

import { motion } from 'framer-motion';

//ttps://www.figma.com/community/file/1239958249701816228
// https://developer.infojobs.net/

function App() {
  const [offersList, setOffersList] = useState<Item[]>([]);
  const [offerShowed, setOfferShowed] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [actualLeftOffer, setActualLeftOffer] = useState<Offer>();
  const [actualRigthOffer, setActualRigthOffer] = useState<Offer>();
  const [actualIndexOffer, setActualIndexOffer] = useState<number>(1);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [searchingOffer, setSearchingOffer] = useState<boolean>(false);

  const [expDictionary, setExpDictionary] = useState<ExperienceDictionary[]>(
    []
  );

  useEffect(() => {
    initExpList();
  }, []);
  useEffect(() => {
    console.log({ actualLeftOffer, actualRigthOffer });
  }, [actualLeftOffer, actualRigthOffer]);

  const searchModalCallback = (filters: any): void => {
    console.log('searchModalCallback', filters);
    setHasResults(false);
    getOffersByFormFilters(filters.keywords, filters.exp, filters.minSalary);
  };

  function getOffersByFormFilters(q: string, e: string, s: string) {
    getOffersByProps({ query: q, expMin: e, salaryMin: s }).then((offers) => {
      console.log({ offers });
      if (offers.totalResults > 1) {
        setOffersList(offers.items);
        setInfoOfferById(offers.items[0].id, true);
        setInfoOfferById(offers.items[1].id, false);
        setShowModal(false);
      } else {
        setHasResults(true);
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

      setSearchingOffer(false);
    });
  }

  function setNewOffer(offerChoosed: offerData) {
    if (!searchingOffer) {
      setSearchingOffer(true);

      if (actualIndexOffer >= offersList.length) {
        alert('finish');
        setSearchingOffer(false);
        return;
      }

      const newId = offersList[actualIndexOffer].id;
      const newOfferToShow = offersList.find((x) => x.id === newId);
      const offerItemSelected = offersList.find(
        (x) => x.id === offerChoosed.data.id
      );

      if (newOfferToShow) {
        setInfoOfferById(newId, !offerChoosed.isLeft);

        let offerToHistory: Item[] = [];

        const offerInHistory = offerShowed.find(
          (x) => x.id === offerChoosed.data.id
        );

        let idOfferDismissed = '';
        if (offerChoosed.isLeft && actualRigthOffer?.id) {
          offerItemSelected!.offerInfo = actualLeftOffer;
          idOfferDismissed = actualRigthOffer?.id;
        } else {
          offerItemSelected!.offerInfo = actualRigthOffer;
          idOfferDismissed = actualLeftOffer?.id;
        }

        console.log({ offerItemSelected });

        const offerDismissed = offersList.find(
          (x) => x.id === idOfferDismissed
        );
        const offerDismissInHistory = offerShowed.find(
          (x) => x.id === idOfferDismissed
        );

        console.log({ idOfferDismissed });
        let maxScore = getTopOffer()?.score;

        if (offerInHistory) {
          offerInHistory.score += 1;

          if (!offerDismissInHistory) {
            if (offerChoosed.isLeft) {
              offerDismissed!.offerInfo = actualRigthOffer;
            } else {
              offerDismissed!.offerInfo = actualLeftOffer;
            }

            offerToHistory = [...offerShowed, offerDismissed];
          } else {
            offerToHistory = [...offerShowed];
            offerToHistory.find((x) => x.id === offerChoosed.data.id)!.score +=
              maxScore + 1;
          }
        } else {
          if (offerItemSelected) {
            if (offerChoosed.isLeft) {
              offerDismissed!.offerInfo = actualRigthOffer;
            } else {
              offerDismissed!.offerInfo = actualLeftOffer;
            }

            // console.log({ maxScore });
            maxScore = maxScore ? maxScore : 0;
            offerItemSelected.score += maxScore + 1;
            if (!offerDismissInHistory) {
              offerToHistory = [
                ...offerShowed,
                offerItemSelected,
                offerDismissed,
              ];
            } else {
              offerToHistory = [...offerShowed, offerItemSelected];
            }
          }
        }

        console.log({ offerToHistory });
        setOfferShowed(offerToHistory);
      }
    }
  }

  function orderHistory(): Item[] {
    const history = [...offerShowed];
    return history.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  function initExpList() {
    getExpDictionary().then((res) => {
      setExpDictionary(res);
    });
  }

  const historyClick = (id: string) => {
    // console.log('histórico', offerShowed);
    if (id !== getTopOffer()?.id) {
      const offerHSelected = offerShowed.find((x) => x.id === id);
      if (actualLeftOffer?.id === getTopOffer()?.id) {
        if (offerHSelected) {
          addToHistory(actualRigthOffer);
          setActualRigthOffer(offerHSelected.offerInfo);
        }
      } else {
        if (offerHSelected) setActualLeftOffer(offerHSelected.offerInfo);
      }
    }
  };

  //Todo: Reutilizar en setNewOffer
  const addToHistory = (offer: Offer) => {
    if (offer) {
      const newOfferToHistory = offersList.find((x) => x.id === offer.id);

      const inHistory = offerShowed.find((x) => x.id === offer.id);

      if (!inHistory)
        if (newOfferToHistory) {
          newOfferToHistory.score = 0;
          newOfferToHistory.offerInfo = offer;
          const newOfferHistory = [...offerShowed, newOfferToHistory];
          setOfferShowed(newOfferHistory);
        }
    }
  };

  //Todo: Refactor
  function getTopOffer(): Item {
    return orderHistory()[0];
  }

  return (
    <main>
      {showModal && (
        <ModalFilters
          isEmptyResults={hasResults}
          clickFunction={searchModalCallback}
          expDictionary={expDictionary}
        ></ModalFilters>
      )}

      <div className='row h-[8%]'>
        <div className='w-full'>
          <div className='flex'>
            <div className='w-1/2'>
              {' '}
              <nav
                className='w-full pl-7'
                onClick={() => location.replace('https://www.infojobs.net/')}
              >
                <img
                  className='pt-4 inline-block cursor-pointer'
                  width={38}
                  src='/logo.svg'
                  alt='mini-logo-infojobs'
                />
                <img
                  className='pt-6 pl-6 inline-block cursor-pointer'
                  src='/text-logo.svg'
                  alt='infojobs'
                />
              </nav>
            </div>
            <div className='w-1/2'>
              <span className='pt-6 pl-10 inline-block font-bold color-info-primary'>
                COMPARADOR DE OFERTAS DE INFOJOBS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='page w-full m-0'>
        <div className='column'>
          <div className='h-[8%]'>
            <p className='pl-1 font-semibold'>Ofertas encontradas:</p>
            <p className='pl-1'>
              {actualIndexOffer} / {offersList.length}
            </p>
          </div>
          <div className='h-[80%] max-h-screen overflow-y-auto pr-2'>
            {offerShowed.length === 0 && (
              <div className='bg-[#E8F2F8] color-info-primary px-5 py-3 text-sm rounded-md'>
                <svg
                  className='inline-block mr-2'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 1.75C6.33908 1.75 1.75 6.33908 1.75 12C1.75 17.6609 6.33908 22.25 12 22.25C17.6609 22.25 22.25 17.6609 22.25 12C22.2445 6.34137 17.6586 1.75551 12 1.75ZM20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8302 3.25551 20.7445 7.16979 20.75 12ZM12 9.25C12.5523 9.25 13 8.80228 13 8.25C13 7.69772 12.5523 7.25 12 7.25C11.4477 7.25 11 7.69772 11 8.25C11 8.80228 11.4477 9.25 12 9.25ZM11.25 11.5C11.25 11.0858 11.5858 10.75 12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V11.5Z'
                    fill='#167DB7'
                  />
                </svg>
                <span className='font-semibold'>
                  Compara entre estas 2 ofertas y elige cuál es la mejor para
                  ti, podrás ver las ofertas aunque las hayas descartado
                </span>
              </div>
            )}

            {orderHistory().map((offer) => {
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <OfferHistory
                    key={offer.id}
                    data={offer}
                    idTop={getTopOffer()?.id}
                    callbackChoose={historyClick}
                  ></OfferHistory>
                </motion.div>
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
            isEndResults={actualIndexOffer >= offersList.length}
          ></OfferCard>
        </div>
        <div className='column'>
          <OfferCard
            data={actualRigthOffer}
            isLeft={false}
            callbackChoose={setNewOffer}
            idTop={getTopOffer()?.id}
            isEndResults={actualIndexOffer >= offersList.length}
          ></OfferCard>
        </div>
      </div>
    </main>
  );
}

export default App;
