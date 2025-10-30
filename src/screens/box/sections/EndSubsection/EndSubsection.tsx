import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { useI18n } from "../../../../lib/i18n";

const socialIcons = [
  {
    src: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/container-1.svg",
    alt: "Social media icons",
  },
];

export const EndSubsection = () => {
  const { t } = useI18n();
  return (
    <footer className="w-full bg-[#2c5bac] py-[70px] px-[67px]">
      <div className="max-w-[1545px] mx-auto">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-[231px]">
          <div className="flex flex-col gap-6">
            <h2 className="[font-family:'Outfit',Helvetica] font-semibold text-white text-[26px] tracking-[0] leading-[33.8px]">
              {t.footer.care}
            </h2>
            <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[18.2px]">
              {t.footer.tagline}
            </p>
            {socialIcons.map((icon, index) => (
              <img
                key={index}
                className="w-[112px] h-6"
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="[font-family:'Inter',Helvetica] font-black text-white text-sm tracking-[0] leading-[21px]">
              {t.footer.support}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:123-456-7890"
                className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 hover:underline transition-opacity"
              >
                123-456-7890
              </a>
              <a
                href="mailto:info@clinic.com"
                className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 hover:underline transition-opacity"
              >
                info@clinic.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="[font-family:'Inter',Helvetica] font-black text-white text-sm tracking-[0] leading-[21px]">
              {t.footer.connect}
            </h3>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="fullname"
                className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6"
              >
                {t.footer.yourName}
              </label>
              <Input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                className="h-[52.8px] bg-white rounded-[10px] border border-solid border-[#b8c0cc] px-[16.8px] [font-family:'Inter',Helvetica] font-normal text-[#0d141a] text-base placeholder:opacity-50"
              />
              <Button className="w-[209.95px] h-[48.8px] bg-[#2e86ab] hover:bg-[#2e86ab]/90 rounded-[50px] [font-family:'Inter',Helvetica] font-normal text-white text-sm text-center tracking-[0] transition-colors">
                {t.footer.submitInquiry}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-[72px] border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[18.2px]">
              {t.footer.allRightsReserved}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy-policy"
                className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[18.2px] hover:underline transition-opacity hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  // Здесь можно добавить переход на страницу Privacy Policy
                  alert("Privacy Policy page will be implemented");
                }}
              >
                {t.header.privacyPolicy}
              </a>
              <span className="text-white/50">|</span>
              <a
                href="#terms-of-use"
                className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[18.2px] hover:underline transition-opacity hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  // Здесь можно добавить переход на страницу Terms of Use
                  alert("Terms of Use page will be implemented");
                }}
              >
                {t.header.termsOfUse}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
