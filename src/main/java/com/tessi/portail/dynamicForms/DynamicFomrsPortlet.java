package com.tessi.portail.dynamicForms;

import com.tessi.portail.dynamicForms.exception.ApplicationException;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

/**
 * @author Konstantinos Karavitis
 **/
public class DynamicFomrsPortlet extends AbstractAngularPortlet {
    @Override
    protected AngularPortletConfig createAngularPortletConfiguration(String apiUrl, RenderRequest request, RenderResponse response) throws ApplicationException {
        return new AngularPortletConfig(apiUrl, getResourceBundle(request.getLocale()));
    }
}
