import React from "react";
import { Button } from "./button";
import { useI18n } from "../../lib/i18n";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: {
    name: string;
    specialty: string;
    photo: string;
    education: string[];
    experience: string;
    description: string;
    languages: string[];
  } | null;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const { t } = useI18n();

  if (!doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {doctor.name}
          </h2>
          <p className="text-xl text-blue-600 font-semibold">
            {doctor.specialty}
          </p>
        </div>

        {/* Doctor Photo and Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-48 h-48 rounded-2xl object-cover mx-auto md:mx-0"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.consultation.about}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {doctor.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.consultation.experience}
              </h3>
              <p className="text-gray-600">{doctor.experience}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.consultation.languages}
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t.consultation.education}
          </h3>
          <ul className="space-y-2">
            {doctor.education.map((edu, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-gray-600">{edu}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl hover-lift hover-glow transition-all duration-300"
            onClick={() => {
              // Here you can add booking functionality
              alert("Booking functionality will be implemented");
            }}
          >
            {t.consultation.bookAppointment}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 py-3 rounded-xl hover-scale transition-all duration-300"
            onClick={onClose}
          >
            {t.consultation.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  insurance: {
    name: string;
    logo: string;
    description: string;
    duration: string;
    coverage: string[];
    price: string;
    features: string[];
  } | null;
}

export const InsuranceModal: React.FC<InsuranceModalProps> = ({
  isOpen,
  onClose,
  insurance,
}) => {
  if (!insurance) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-6">
          <img
            src={insurance.logo}
            alt={insurance.name}
            className="w-24 h-24 rounded-xl object-cover shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {insurance.name}
            </h2>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              {insurance.duration}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {insurance.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Coverage Includes:
            </h3>
            <ul className="space-y-2">
              {insurance.coverage.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Key Features:
            </h3>
            <ul className="space-y-2">
              {insurance.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Starting from</p>
            <p className="text-4xl font-bold text-blue-600">
              {insurance.price}
            </p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl hover-lift hover-glow transition-all duration-300">
            Buy Insurance
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 py-3 rounded-xl hover-scale transition-all duration-300"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    image: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
  } | null;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  article,
}) => {
  const { t } = useI18n();
  if (!article) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover rounded-xl shadow-lg mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {article.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>
              {t.blog.by} {article.author}
            </span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>
              {article.readTime} {t.blog.read}
            </span>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {article.content}
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl hover-lift hover-glow transition-all duration-300"
          >
            {t.blog.closeArticle}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
