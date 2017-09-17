package com.apple.rtdashboard.controllers;

import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.apple.rtdashboard.dto.ErrorResponse;
import com.apple.rtdashboard.dto.MilestoneDTO;
import com.apple.rtdashboard.exception.ApplicationException;
import com.apple.rtdashboard.exception.DataNotFoundException;
import com.apple.rtdashboard.service.MilestoneService;
import com.apple.rtdashboard.service.RepositoryService;
import com.apple.rtdashboard.util.PropertyUtils;
import com.apple.rtdashboard.util.RTDAuthenticationUtil;

@RestController
@RequestMapping("/milestone")

public class MilestoneController{
	
private static final Logger LOG = Logger.getLogger(MilestoneController.class);
	
	@Autowired
	private MilestoneService milestoneSvc;
	
	/**
	 * @param milestoneSvc the milestoneSvc to set
	 */
	@Autowired
	public void setMilestoneSvc(MilestoneService milestoneSvc) {
		this.milestoneSvc = milestoneSvc;
	}
	/**
	 * @return the milestoneSvc
	 */
	public MilestoneService getMilestoneSvc(){
		return milestoneSvc;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> addMilestoneData(@RequestBody MilestoneDTO milestoneDTO, HttpSession session) throws Exception {

		LOG.info("createMilestoneData method invoked.");
		Boolean milestoneList = milestoneSvc.addMilestone(session, milestoneDTO);
		return new ResponseEntity<Boolean>(milestoneList, HttpStatus.OK);

	}
	
	//Link for BHU Status Detail report
	@RequestMapping(value = "/status/{bhu-ID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public void getBHUStatus(HttpSession session, HttpServletResponse response,
			@PathVariable("bhu-ID") String bhuID,
			@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
	{
		LOG.info("getStatusForBHU method invoked");
		milestoneSvc.downloadBHUMilestoneReport(session, bhuID, response);
	}
	
	//method to send email notification
	@RequestMapping(value = "/doEmail", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public void sendEmailNotification(HttpSession session, HttpServletResponse response,
			@RequestParam("status") String plcStatus,
			@RequestParam("send-to") String sendTo,
			@RequestParam("content") String emailContent,
			@RequestParam("file") MimeMultipart file) throws Exception
	{
		LOG.info("getStatusForBHU method invoked");
		String to = "ksankul@apple.com";
		String from = "klankalapalli@apple.com";// receiver email
		String host = "mail.apple.com";
		String user = "swaminathan_vanchinathan";
		String passs = "Aug@2017";// mail server host

		Properties props = PropertyUtils.loadProperties();
		System.out.println(props.getProperty("hpalm.host"));

		Session mailSession = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(user,passs);
			}
		});
		
		try {
			Message message = new MimeMessage(mailSession);// Create a default MimeMessage object
			message.setFrom(new InternetAddress(from));// Set From: header field of the header            
			message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
			message.setSubject("Test Mail from Java Program"); // subject line
			
			BodyPart messageBodyPart = new MimeBodyPart();// Create the message part
			messageBodyPart.setText("This is message body");

			Multipart multipart = new MimeMultipart(); // Create a multipar message
			multipart.addBodyPart(messageBodyPart); // Set text message part
			// Part two is attachment
			messageBodyPart = new MimeBodyPart();
			String filename = "/Users/ksankul/Downloads/FS3.3.docx";
			DataSource source = new FileDataSource(filename);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName(filename);
			multipart.addBodyPart(messageBodyPart);

		// Send the complete message parts
		message.setContent(multipart);

		//`Send message
		Transport.send(message);
		// //image in body part
		//            MimeMultipart multipart = new MimeMultipart();
		//            BodyPart messageBodyPart = new MimeBodyPart();
		//            String htmlText = "<H1>find the below image</H1><img src=\"cid:image\">";
		//            messageBodyPart.setContent(htmlText, "text/html");
		//            // add it
		//            multipart.addBodyPart(messageBodyPart);
		//            // second part (the image)
		//            messageBodyPart = new MimeBodyPart();
		//            DataSource fds = new FileDataSource("/Users/ksankul/Desktop/Sample.jpeg");
		//            messageBodyPart.setDataHandler(new DataHandler(fds));
		//            messageBodyPart.setHeader("Content-ID", "<image>");
		//            
		//            // Send message
		//            Transport.send(message);
		//           
			System.out.println("Email Sent successfully....");
		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
	
}