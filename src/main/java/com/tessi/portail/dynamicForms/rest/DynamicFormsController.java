package com.tessi.portail.dynamicForms.rest;

import java.util.List;


import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
import com.owliance.api.model.wvo.*;
import com.owliance.portail.common.http.AdherentProvider;
import com.owliance.portail.common.http.ContratRessource;
import com.owliance.portail.common.http.DemandeContactMotifResource;
import com.owliance.portail.common.http.UserResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tessi.portail.dynamicForms.exception.ApplicationException;

import javax.portlet.ActionRequest;

/**
 * @author hzamouri
 **/
@RestController
public class DynamicFormsController {

    public static final Logger LOG = LoggerFactory.getLogger(DynamicFormsController.class);

    @Autowired
    private AdherentProvider adherentResource;
    @Autowired
    private UserResource userResource;

    @PutMapping ("/ChangeMail")
    public ResponseEntity<ChangeEmailWVO> addMotif(@RequestBody ChangeEmailWVO mail) throws ApplicationException {
        System.out.println("RequestBody ===> "+mail);
        ServiceContext serviceContext = ServiceContextThreadLocal.getServiceContext();
        ChangeEmailWVO result = adherentResource.editEmailAdress(serviceContext.getLiferayPortletRequest(),mail);
        System.out.println("result ===> "+result);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PutMapping ("/Submit")
    public void update( UserWVO mail) throws ApplicationException {
        System.out.println("RequestBody ===> "+mail);
        UserWVO result = userResource.update(mail);
        System.out.println("result ===> "+result);

    }
    @GetMapping("/get_user_info")
    public ResponseEntity<UserWVO> getUserInfo() throws ApplicationException {
        System.out.println("get user info controller");
        UserWVO user = getCurrentUser();
        return new ResponseEntity<UserWVO>(user, HttpStatus.OK);
    }


    private UserWVO getCurrentUser() {
        ServiceContext serviceContext = ServiceContextThreadLocal.getServiceContext();
        User connectedUser = serviceContext.getThemeDisplay().getUser();
        System.out.println("got connected user with mail : " + connectedUser.getEmailAddress());
        UserWVO userWVO = new UserWVO();
        userWVO.setMail(connectedUser.getEmailAddress());
        return userWVO;
    }

}
