import { Offer } from '../models/Offer';
import { Item } from '../services/Infojobs.service';

export function OfferHistory({ data }: OfferHistoryData) {
  return (
    <>
      <div className='block rounded-lg bg-gray-200 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-1 '>
        <p className='text-xs'>
          {' '}
          {data.title}({data.score}) _ {data.id}
        </p>
      </div>
    </>
  );
}

export interface OfferHistoryData {
  data: Item;
  callbackChoose?: (id: string) => void;
}
