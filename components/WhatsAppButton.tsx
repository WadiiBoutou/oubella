'use client';

import { useLanguage } from '@/context/LanguageContext';

const WhatsAppButton = () => {
  const { t, isRTL } = useLanguage();
  const whatsappNumber = '212676767676';

  return (
    <a
      className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-xl shadow-[#25D366]/20 z-50 bg-[#25D366] border border-tertiary/50 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-transform duration-300 group ring-4 ring-white/10"
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsapp}
    >
      <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.029a11.758 11.758 0 001.574 5.91l-1.674 6.115 6.255-1.642a11.876 11.876 0 005.889 1.559h.005c6.632 0 12.029-5.398 12.032-12.034a11.83 11.83 0 00-3.483-8.435z" />
      </svg>
      <span className={`absolute ${isRTL ? 'left-20' : 'right-20'} bg-[#25D366] text-white px-4 py-2 rounded-sm text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest editorial-shadow border border-tertiary/20`}>
        {t.common.whatsapp}
      </span>
    </a>
  );
};

export default WhatsAppButton;
