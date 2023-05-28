import React, { useState } from 'react';
import { Offer } from '../models/Offer';
import { motion } from 'framer-motion';
import { ModalPostulation } from './ModalPostulation';

export function OfferCard({
  data,
  isLeft,
  callbackChoose,
  idTop,
  isEndResults,
}: offerData) {
  const [btnClass, setBtnClass] = useState('bg-primary');
  const [postulate, setPostulate] = useState(false);

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

  const handleHover = () => {
    setBtnClass('bg-orange-600');
  };

  const handleBlur = () => {
    setBtnClass('bg-slate-600');
  };

  const urlCompany = () => {
    return data.profile.corporateWebsiteUrl.includes('infojobs.net')
      ? data.profile.corporateWebsiteUrl
      : `https://www.google.com.co/search?q=${data.profile.name}`;
  };

  const auxPostualte = () => {
    return data?.id === idTop || isEndResults;
  };

  const handlePostulate = () => {
    setTimeout(() => {
      setPostulate(true);
    }, 150);
  };

  const handleCancelPostulate = (): void => {
    console.log('cancel');
    setPostulate(false);
  };

  let cardClass = 'block rounded-lg bg-white p-6  cardOffer max-h-screen ';
  if (data != null) if (idTop == data.id) cardClass += 'offer-top';

  return (
    <div className={cardClass}>
      {data && (
        <>
          {idTop == data.id && (
            <div className='crown-div'>
              <img src='/crown.png' width={18} alt='mejorOferta'></img>
            </div>
          )}

          <motion.div
            key={data?.id}
            animate={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
            className='h-[10%]'
          >
            <p className='font-bold offer-title'>{data.title}</p>
            <div className='flex items-center text-sm pt-2'>
              <span className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#167DB7'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                  />
                </svg>
              </span>
              <p className='pl-2'> {data.salaryDescription}</p>
            </div>
          </motion.div>

          <motion.div
            key={'desc-' + data?.id}
            animate={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
            className='h-[80%]  overflow-y-auto max-h-screen  text-sm'
          >
            <p className='font-semibold pt-2'>Compañía:</p>
            <a
              href={urlCompany()}
              target='_blank'
              rel='noreferrer'
              className='mb-4 px-2 font-semibold color-info-primary'
            >
              {data.profile.name}
            </a>
            <p className='font-semibold pt-2'>Perfil:</p>
            <p className='mb-4 px-2 text-neutral-600 '>
              {data.minRequirements ? data.minRequirements : 'No especificado'}
            </p>
            <p className='font-semibold'>Oferta:</p>

            <p className='mb-4 px-2 text-neutral-600  '>
              {convertNewlinesToBreaks(data.description)}
            </p>

            {data.skillsList?.length > 0 && (
              <>
                <p className='font-semibold pb-2'>Conocimientos requeridos:</p>
                <div className='px-2 space-x-2 space-y-2'>
                  {data.skillsList.map((skill) => {
                    return (
                      <a
                        href={`https://www.infojobs.net/ofertas-trabajo/${skill.skill}`}
                        className='span-skill'
                        target='_blank'
                        rel='noreferrer'
                        key={skill.skill}
                      >
                        {skill.skill}
                      </a>
                    );
                  })}
                  {/* </p> */}
                </div>
              </>
            )}

            <p className=' mt-2 font-semibold'>Experiencia requerida:</p>

            <p className='mb-4 px-2 text-neutral-600  '>
              {convertNewlinesToBreaks(data.experienceMin.value)}
            </p>
          </motion.div>
          <div className='h-[10%] '>
            <div className='w-full pt-5  text-center p-3 h-full'>
              {!isEndResults && (
                <button
                  type='button'
                  className={
                    btnClass +
                    ' inline-block align-middle rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-800 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] -4px_rgba(59,113,202,0.5)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  }
                  data-te-ripple-init
                  data-te-ripple-color='light'
                  onClick={handleChoose}
                >
                  {data?.id === idTop
                    ? 'Comparar contra otra'
                    : 'Prefiero esta'}
                </button>
              )}

              {auxPostualte() && (
                <button
                  type='button'
                  className={
                    ' bg-seccondary ml-3 inline-block align-middle rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-800 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] -4px_rgba(59,113,202,0.5)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  }
                  data-te-ripple-init
                  data-te-ripple-color='light'
                  onClick={handlePostulate}
                >
                  Postularme ahora
                </button>
              )}
            </div>
          </div>
          {postulate && (
            <ModalPostulation
              callbackCancel={handleCancelPostulate}
            ></ModalPostulation>
          )}
        </>
      )}

      {!data && (
        <>
          <div className='w-full h-[10%]'>
            <h3 className='h-4 w-[90%] bg-gray-200 rounded-md'></h3>
          </div>
          <div className='w-full h-[80]'>
            <h3 className='h-3 w-[16%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-full bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[96%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[92%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[16%] bg-gray-200 rounded-md mt-8 mb-2'></h3>
            <h3 className='h-3 w-[99%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[66%] bg-gray-200 rounded-md my-2'></h3>
            <div className='w-full py-6'></div>
            <h3 className='h-3 w-[16%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-full bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[96%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[99%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[99%] bg-gray-200 rounded-md my-2'></h3>
            <h3 className='h-3 w-[75%] bg-gray-200 rounded-md my-2'></h3>
          </div>
        </>
      )}
    </div>
  );
}

export interface offerData {
  data: Offer;
  isLeft: boolean;
  callbackChoose?: (offer: offerData) => void;
  idTop?: string;
  isEndResults?: boolean;
}
