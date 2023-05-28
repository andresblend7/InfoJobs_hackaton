import { Offer } from '../models/Offer';

const url = '/api/api';
//   const url = '/api/api/7/offer/b197a64f5441eb91c0c465472e5cc8';

const authorizationToken =
  'Basic YzJlZmE1MzNhODZmNGU3NWE0ZjdmNzI2YzEwYTI1NTU6REcwSDhZQUowNVAzRnJNTUdWMnRYaG8xWDd3ZEkwWEJoZDJkakJReFpQeFNTRFRXMFI=';

export async function getOffersByProps(
  filters: OfferSearchProp
): Promise<Offers> {
  const urlFinal = buildUrl(filters);

  const response: Offers = {
    totalResults: 0,
    items: [],
  };

  try {
    console.log({ urlFinal });

    const fetchResponse = await fetch(urlFinal, {
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await fetchResponse.json();

    if (data?.currentResults > 0) {
      const offers = data.items.map((item: any): Item => {
        return {
          id: item.id,
          link: item.link,
          title: item.title,
          score: 0,
        };
      });
      response.totalResults = data.currentResults;
      response.items = offers;
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
    return response;
  }
}

export async function getOfferById(id: string): Promise<object> {
  try {
    const fetchResponse = await fetch(`${url}/7/offer/${id}`, {
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await fetchResponse.json();

    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
}

export async function getExpDictionary(): Promise<ExperienceDictionary[]> {
  try {
    const fetchResponse = await fetch(`${url}/1/dictionary/experience-min`, {
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await fetchResponse.json();
    return data as ExperienceDictionary[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function buildUrl(data: OfferSearchProp): string {
  let urlFinal = `${url}//7/offer?q=${data.query}`;

  if (data.expMin) {
    urlFinal += `&experienceMin=${data.expMin}`;
  }

  if (data.salaryMin) {
    urlFinal += `&salaryMin=${data.salaryMin}`;
  }

  return urlFinal;
}

export interface Offers {
  totalResults: number;
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  link: string;
  offerInfo?: Offer;
  score: number;
}

export interface OfferSearchProp {
  query: string;
  expMin: string;
  salaryMin?: string;
}

export interface ExperienceDictionary {
  id: number;
  value: string;
  order: number;
  key: string;
}
