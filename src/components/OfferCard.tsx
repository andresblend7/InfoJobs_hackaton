import React, { useState } from 'react';
import { Offer } from '../models/Offer';

export function OfferCard({ data, isLeft, callbackChoose, idTop }: offerData) {
  const [btnClass, setBtnClass] = useState('bg-slate-500');

  function convertNewlinesToBreaks(text: string) {
    const parts = text.split('\n');
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index !== parts.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  const handleChoose = () => {
    if (callbackChoose) callbackChoose({ data, isLeft });
  };

  return (
    <>
      <div
        className='block rounded-lg bg-gray-200 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] cardOffer max-h-screen '
        onMouseEnter={() => {
          setBtnClass('bg-orange-700');
        }}
        onMouseOut={() => {
          setBtnClass('bg-slate-600');
        }}
      >
        {data && (
          <>
            <div className='h-[10%] '>
              <p>{data.title}</p>
              <p>{data.salaryDescription}</p>
              {idTop == data.id && (
                <div className='crown'>
                  <img src='/crown.png' width={24} alt='mejorOferta'></img>
                </div>
              )}
            </div>

            <div className='h-[80%]  overflow-y-auto max-h-screen '>
              <p className='font-semibold'>Perfil:</p>
              <p className='mb-4 text-sm text-neutral-600 '>
                {data.minRequirements}
              </p>
              <p className='font-semibold'>Oferta</p>
              <p className='mb-4  text-neutral-600 text-sm '>
                {convertNewlinesToBreaks(data.description)}
              </p>
            </div>
            <div className='h-[10%] '>
              <div className='w-full pt-5  text-center p-3 h-full'>
                <button
                  type='button'
                  className={
                    btnClass +
                    ' inline-block align-middle rounded bg-slate-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-800 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] -4px_rgba(59,113,202,0.5)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  }
                  data-te-ripple-init
                  data-te-ripple-color='light'
                  onClick={handleChoose}
                >
                  Prefiero esta oferta {btnClass}
                </button>
              </div>
            </div>
          </>
        )}

        {!data && <>Cargando</>}
      </div>
    </>
  );
}

export interface offerData {
  data: Offer;
  isLeft: boolean;
  callbackChoose?: (offer: offerData) => void;
  idTop?: string;
}
