import { Offer } from '../models/Offer';
import { Item } from '../services/Infojobs.service';

export function OfferHistory({ data, idTop }: OfferHistoryData) {
  return (
    <>
      <div className='block rounded-lg bg-white p-6  mt-3 cursor-pointer hover:shadow-md '>
        {idTop == data.id && (
          <div className='crown-div'>
            <img src='/crown.png' width={14} alt='mejorOferta'></img>
          </div>
        )}
        <p className='text-xs'>{data.title}</p>
      </div>
    </>
  );
}

export interface OfferHistoryData {
  data: Item;
  idTop: string;
  callbackChoose?: (id: string) => void;
}
