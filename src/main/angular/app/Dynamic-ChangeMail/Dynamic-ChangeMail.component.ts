import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

import {MessageService} from '../messages/message.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ConfigurationService} from '../configuration.service';
import {UtilsService} from "../utils/utils.service";
import {LanguageInjectable} from "../LanguageInjectable";
import {FormGroup, NgForm} from '@angular/forms';
import {MatDialog} from "@angular/material";
import {finalize} from 'rxjs/operators';
import {NewMail} from '../models/NewMail';
import {User} from '../models/User';
import {DynamicChangeMailService} from './Dynamic-ChangeMail.service';

@Component({
    selector: 'Dynamic-ChangeMail',
    templateUrl: './Dynamic-ChangeMail.component.html',
    styleUrls: ['./Dynamic-ChangeMail.component.css'],
    providers: [
        MessageService,
      DynamicChangeMailService,
        UtilsService
    ]
})
export class DynamicChangeMailComponent implements OnInit, AfterViewInit {
resume=false;
    @Input() config: string;
    showTousInSiteType : string;
    submitForm = true;
    emailError=false;
    public form: FormGroup;
    emailPatternError=false;
NewMail=new NewMail();
nouveaumail:string;
    used = false;

    firstName:string;
    lastName:string;
    Phone:string;
    location : string;
    @ViewChild('mailForm', {static: false}) myForm: NgForm;
    currentUserMail:string;


    constructor(private dialog: MatDialog,
                private dynamicChangeMailService:DynamicChangeMailService, public languageInjectable: LanguageInjectable, private utilsService: UtilsService,
                private messageService: MessageService, private configurationService: ConfigurationService) {

    }

    ngOnInit() {
        this.configurationService.init(this.config);
        this.utilsService.initLanguage().subscribe(rep => {
            this.languageInjectable.property = rep;
           this.showTousInSiteType = this.languageInjectable.property['admin.portail.show.valeur.tous.site.type'];

        });
        console.info('ngOnInit!');

    }

    resetForm() {
        this.myForm.reset();
       location.reload();
    }
    ngAfterViewInit(): void {
        console.info('AfterViewInit!');
    }
  user:User;


    submitMail(mailForm) {
        if (mailForm.newEmail != null) {
            this.dynamicChangeMailService.getUserInfo().subscribe(rep => {
                console.log("get user info rep : ", rep);
                mailForm.newEmail = rep.mail;

            });
        }
    }

    checkEmailUsed(newEmail){
        this.used=false;
        if (! newEmail==null)
        {
      console.log("user"+this.getUserInfo())
        }
    }

   us:User;

    getUserInfo() {
        this.dynamicChangeMailService.getUserInfo().subscribe(rep => {
            console.log("get user info rep : ", rep);
            this.currentUserMail = rep.mail;
            this.firstName=rep.firstName;
            this.lastName=rep.lastName;
            this.Phone=rep.phone;
        });
    }

    /*@ActionMapping(params = "action=")
        public void submitPersonalData(ActionRequest request, ActionResponse response, Model model,
                @ModelAttribute("mailForm") ChangeEmailWVO form) {

            ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute("LIFERAY_SHARED_THEME_DISPLAY");
            User user = themeDisplay.getUser();
            form.setEmail(user.getEmailAddress());
            form.setUsername(user.getFirstName() + " " + user.getLastName());

            if (!StringUtils.isEmpty(form.getNewEmail())) {

                try {

                    user.setEmailAddress(form.getNewEmail());
                    UserLocalServiceUtil.updateUser(user);

                    UserWVO userwvo = new UserWVO();
                    userwvo.setEmail(user.getEmailAddress());
                    userwvo.setUsername(user.getScreenName());
                    userwvo.setUuid(user.getUuid());
                    userResource.update(request,userwvo);

                } catch (Exception e) {
                    LOG.error("Exception ", e);
                }
            }
            if (!StringUtils.isEmpty(form.getPhone())) {
                com.liferay.portal.kernel.service.ServiceContext context = new com.liferay.portal.kernel.service.ServiceContext();

                Phone phone = UserUtil.getUserPersonalPhone(user, "personal");
                try {
                    if (phone != null && !phone.getNumber().equals(form.getPhone())) {
                        LOG.info("Phone exist {}", phone.getNumber());
                        PhoneLocalServiceUtil.updatePhone(phone.getPhoneId(), form.getPhone(), null, 11011, true);

                    } else if (phone == null) {
                        LOG.info("Phone not exist");
                        PhoneLocalServiceUtil.addPhone(user.getUserId(), Contact.class.getName(), user.getContactId(),
                                form.getPhone(), null, 11011, true, context);


                    }
                } catch (PortalException e) {
                    LOG.error("Update Phone PortalException {}", e);
                } catch (SystemException e) {
                    LOG.error("Update Phone SystemException {}", e);
                }
            }

            LOG.info("form  {}", form.toString());

            ChangeEmailWVO editEmailAdress = adherentResource.editEmailAdress(request, form);

            /*
             * if(editEmailAdress !=null) {
             */
    Map<String, String> demandeDetails = ChangeMailLanquage.loadResumeMap(editEmailAdress);

    model.addAttribute("demandeDetails", demandeDetails);

    /* } */
    /*
     * else { LOG.info(" editEmailAdress is null "); Map<String, String>
     * demandeDetails = ChangeMailLanquage.loadResumeMap(form);
response.setRenderParameter("action", "gotoresume");

}

@RenderMapping(params = "action=gotoresume")
public String gotoresume(RenderRequest request, RenderResponse response, Model model) {
    LOG.info("View Demande resume");
    ChangeMailConfiguration configuration = new ChangeMailConfiguration(
        Sets.newTreeSet(configurationResource.loadConfiguration(request).getContent()));
    model.addAttribute("configuration", configuration);
    return "resume";
}

@ResourceMapping(value = "checkEmailUsed")
public void (ResourceRequest request, ResourceResponse response, Model model)
throws IOException, PortalException, SystemException {
    Boolean used = false;
    LOG.info("-- checkEmailUsed --");

    String newEmail = request.getParameter("newEmail");

    LOG.info("-- newEmail= {}", newEmail);
    if (!StringUtils.isEmpty(newEmail)) {
        ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute("LIFERAY_SHARED_THEME_DISPLAY");
        User user = themeDisplay.getUser();
        LOG.info("user:  {}  ", user.getFullName());
        String siteType = (String) themeDisplay.getLayout().getGroup().getExpandoBridge().getAttribute("type");
        if (siteType.equals("ASSURE")) {
            User virtualUser = null;
            try {
                virtualUser = UserLocalServiceUtil.getUserByEmailAddress(themeDisplay.getCompanyId(), newEmail);
                if (virtualUser != null && user.equals(virtualUser)) {
                    LOG.info("virtualUser:  {}  ", virtualUser.getFullName());
                    used = true;

                }
            } catch (Exception e) {
                LOG.error("Exception ", e);
            }
        }
    }
    response.setContentType("application/x-json");
    PrintWriter out = response.getWriter();
    out.print(used);
}

}
*/





}
