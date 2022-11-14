package com.tessi.portail.dynamicForms.rest;

import com.owliance.portail.common.http.LanguagePropertiesProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController()
@RequestMapping("/utils")
public class UtilsController {

    @Autowired
    LanguagePropertiesProvider languagePropertiesProvider;

    @GetMapping("/init-language")
    public Properties initLanguageProperties() {
        return languagePropertiesProvider.loadLanguageProperties();
    }
}
