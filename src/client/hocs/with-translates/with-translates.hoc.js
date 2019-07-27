import React from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import invoke from 'lodash/invoke';
import { withServices } from 'src/client/hocs/with-services/with-services.hoc';

export const withTranslates = (WrappedComponent) => {
  const WithTranslates = (props) => {
    const services = get(props, 'services');
    const i18nService = get(services, 'i18nService');
    const translate = get(i18nService, 'translate', noop);
    const translateHTML = get(i18nService, 'translateHTML', noop);
    const languageCode = invoke(i18nService, 'getLanguageCode');

    const output = (
      <WrappedComponent
        {...props}
        translate={translate}
        translateHTML={translateHTML}
        languageCode={languageCode}
      />
    );

    return output;
  };
  WithTranslates.displayName = `WithTranslates(${WrappedComponent.name})`;

  return withServices(WithTranslates);
};
