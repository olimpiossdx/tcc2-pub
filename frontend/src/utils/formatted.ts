
type localeCodes = 'zu' | 'zh-tw' | 'zh-sg' | 'zh-mo' | 'zh-hk' | 'zh-cn' | 'yi' | 'xh' | 'vi' | 'uz-uz' | 'uz-uz' | 'ur' | 'uk' | 'tt' | 'ts' | 'tr' | 'tn' | 'tk' | 'th' | 'tg' | 'te' | 'ta' | 'sw' |
  'sv-se' | 'sv-fi' | 'sr-sp' | 'sr-sp' | 'sq' | 'so' | 'sl' | 'sk' | 'si' | 'sd' | 'sb' | 'sa' | 'ru-mo' | 'ru' | 'ro-mo' | 'ro' | 'rm' | 'pt-pt' | 'pt-br' | 'pl' | 'pa' | 'or' | 'no-no' |
  'no-no' | 'nl-nl' | 'nl-be' | 'ne' | 'my' | 'mt' | 'ms-my' | 'ms-bn' | 'mr' | 'mn' | 'mn' | 'ml' | 'mk' | 'mi' | 'lv' | 'lt' | 'lo' | 'la' | 'ks' | 'ko' | 'kn' | 'km' | 'kk' | 'ja' |
  'it-it' | 'it-ch' | 'is' | 'id' | 'hy' | 'hu' | 'hr' | 'hi' | 'he' | 'gu' | 'gn' | 'gd-ie' | 'gd' | 'fr-lu' | 'fr-fr' | 'fr-ch' | 'fr-ca' | 'fr-be' | 'fo' | 'fi' | 'fa' | 'eu' | 'et' | 'es-ve' | 'es-uy' |
  'es-sv' | 'es-py' | 'es-pr' | 'es-pe' | 'es-pa' | 'es-ni' | 'es-mx' | 'es-hn' | 'es-gt' | 'es-es' | 'es-ec' | 'es-do' | 'es-cr' | 'es-co' | 'es-cl' | 'es-bo' | 'es-ar' | 'en-za' | 'en-us' | 'en-tt' |
  'en-ph' | 'en-nz' | 'en-jm' | 'en-in' | 'en-ie' | 'en-gb' | 'en-cb' | 'en-ca' | 'en-bz' | 'en-au' | 'el' | 'de-lu' | 'de-li' | 'de-de' | 'de-ch' | 'de-at' | 'da' | 'cy' | 'cs' | 'ca' |
  'bs' | 'bo' | 'bn' | 'bn' | 'bg' | 'be' | 'az-az' | 'az-az' | 'as' | 'ar-ye' | 'ar-tn' | 'ar-sy' | 'ar-sa' | 'ar-qa' | 'ar-om' | 'ar-ma' | 'ar-ly' | 'ar-lb' | 'ar-kw' | 'ar-jo' |
  'ar-iq' | 'ar-eg' | 'ar-dz' | 'ar-bh' | 'ar-ae' | 'am' | 'af' | 'UTF-8' | 'Maldivian';



interface IDataFormatterOptions {
  type?: 'dd-mm-yyyy HH:mm' | 'dd-mm-yyyy' | 'HH:mm';
  locale?: localeCodes;
};

export const dataFormatter = (data: string, { locale = 'pt-br', type = 'dd-mm-yyyy', }: IDataFormatterOptions): string => {
  let options = { day: 'numeric', month: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;

  if (type === 'HH:mm') {
    options = { hour: 'numeric', minute: 'numeric' };
  }

  if (type === 'dd-mm-yyyy HH:mm') {
    options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' } as Intl.DateTimeFormatOptions;
  }

  return new Date(data).toLocaleString(locale, options);
};