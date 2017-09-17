/**
 * 
 */
package com.apple.rtdashboard.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.apple.rtdashboard.dto.BHUEffortsDTO;
import com.apple.rtdashboard.dto.BHUWarrantyDTO;
import com.apple.rtdashboard.dto.ErrorResponse;
import com.apple.rtdashboard.dto.MilestoneDTO;
import com.apple.rtdashboard.dto.ReportDetails;
import com.apple.rtdashboard.dto.ReportNameDTO;
import com.apple.rtdashboard.exception.ApplicationException;
import com.apple.rtdashboard.exception.DataNotFoundException;
import com.apple.rtdashboard.service.ReportsService;
import com.apple.rtdashboard.util.RTDAuthenticationUtil;
import com.apple.rtdashboard.service.RepositoryService;

/**
 * @author CH349643
 *
 */
@RestController
@RequestMapping("/reports")
public class ReportsController {

	private static final Logger LOG = Logger.getLogger(ReportsController.class);
	
	@Autowired
	RTDAuthenticationUtil authUtil;
	
	private ReportsService reportsSvc;
	private RepositoryService repositorySvc;

	/**
	 * @return the repositorySvc
	 */
	public RepositoryService getRepositorySvc() {
		return repositorySvc;
	}

	/**
	 * @param repositorySvc the repositorySvc to set
	 */
	@Autowired
	public void setRepositorySvc(RepositoryService repositorySvc) {
		this.repositorySvc = repositorySvc;
	}

	/**
	 * @return the reportsSvc
	 */
	public ReportsService getReportsSvc() {
		return reportsSvc;
	}

	/**
	 * @param reportsSvc the reportsSvc to set
	 */
	@Autowired
	public void setReportsSvc(ReportsService reportsSvc) {
		this.reportsSvc = reportsSvc;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ReportNameDTO>> getReposrtsList(HttpSession session) throws ApplicationException {

		LOG.info("getReports method invoked.");
		List<ReportNameDTO> reportLst = reportsSvc.getReports(session);
		return new ResponseEntity<List<ReportNameDTO>>(reportLst, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/download/{report-id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public void downloadReport(HttpSession session, HttpServletResponse response, @PathVariable("report-id") Long reportId) throws ApplicationException {
		LOG.info("downloadReport method invoked.");
		reportsSvc.downloadReport(session, reportId, response);

	}
	
	//BHU details for the current year and quarter
	@RequestMapping(value = "/BHUReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReportDetails> getBHUReport(HttpSession session) throws Exception
	{
		LOG.info("getBHUReport method invoked");
		ReportDetails reportBHUDetails = reportsSvc.getBHUReportDefault(session);
		return new ResponseEntity<ReportDetails>(reportBHUDetails, HttpStatus.OK);
	}
	
	//Filter options
	//BHU details for a specific year
	@RequestMapping(value = "/BHUReport/{filter-year}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReportDetails> getBHUReportForYear(HttpSession session,
			@PathVariable("filter-year") String filterYear,
			@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
	{
		LOG.info("getBHUReportForYear method invoked");
		ReportDetails reportBHUDetails = reportsSvc.getBHUReportForDate(session, filterYear, null, null, startIndex);
		return new ResponseEntity<ReportDetails>(reportBHUDetails, HttpStatus.OK);
	}
	
	//BHU details for a specific year and quarter
	@RequestMapping(value = "/BHUReport/{filter-year}/{filter-quarter}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReportDetails> getBHUReportForQuarter(HttpSession session,
			@PathVariable("filter-year") String filterYear,
			@PathVariable("filter-quarter") String filterQuarter,
			@RequestParam(value="filter-month", defaultValue = "") String filterMonth,
			@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
	{
		LOG.info("getBHUReportForYear method invoked");
		ReportDetails reportBHUDetails = reportsSvc.getBHUReportForDate(session, filterYear, filterQuarter, filterMonth, startIndex);
		return new ResponseEntity<ReportDetails>(reportBHUDetails, HttpStatus.OK);
	}
	
	//BHU details for a specific phase
		@RequestMapping(value = "/BHUReport/phase/{current-phase}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<ReportDetails> getBHUReportForPhase(HttpSession session,
				@PathVariable("current-phase") String currentPhase,
				@RequestParam(value="filter-year", defaultValue = "") String filterYear, 
				@RequestParam(value="filter-quarter", defaultValue = "") String filterQuarter,
				@RequestParam(value="filter-month", defaultValue = "") String filterMonth,
				@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
		{
			LOG.info("getBHUReportForPhase method invoked");
			ReportDetails reportBHUDetails = reportsSvc.getBHUReportForPhase(session, currentPhase, filterYear, filterQuarter, filterMonth, startIndex);
			return new ResponseEntity<ReportDetails>(reportBHUDetails, HttpStatus.OK);
		}
	
	//BHU field Hyperlink url
	//Warranty issues
	@RequestMapping(value = "/BHUReport/warranty/{bhu-ID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BHUWarrantyDTO>> getWarrantyForBHU(HttpSession session,
			@PathVariable("bhu-ID") String bhuID,
			@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
	{
		LOG.info("getWarrantyForBHU method invoked");
		List<BHUWarrantyDTO> reportBHUDetails = reportsSvc.getWarrantyForBHU(session, bhuID, null, startIndex);
		return new ResponseEntity<List<BHUWarrantyDTO>>(reportBHUDetails, HttpStatus.OK);
	}
	
	//Current Status of BHU ID
	@RequestMapping(value = "/BHUReport/status/{bhu-ID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MilestoneDTO>> getStatusForBHU(HttpSession session,
			@PathVariable("bhu-ID") String bhuID,
			@RequestParam(value="start-index", defaultValue = "1") String startIndex) throws Exception
	{
		LOG.info("getStatusForBHU method invoked");
		List<MilestoneDTO> reportBHUDetails = reportsSvc.getStatusForBHU(bhuID);
		return new ResponseEntity<List<MilestoneDTO>>(reportBHUDetails, HttpStatus.OK);
	}
	
	//BHU Efforts
	@RequestMapping(value = "/BHUReport/efforts/{bhu-ID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BHUEffortsDTO>> getEffortsForBHU(HttpSession session, 
			@PathVariable("bhu-ID") String bhuID,
			@RequestParam("size") String bhuSize) throws Exception
	{
		LOG.info("getEffortsForBHU method invoked");
		List<BHUEffortsDTO> bhuEffortDetails = reportsSvc.getEffortsForBHU(bhuID, bhuSize);
		return new ResponseEntity<List<BHUEffortsDTO>>(bhuEffortDetails, HttpStatus.OK);
	}
	
	//Report Download links
	//Link for BHU Report
	@RequestMapping(value = "/BHURepDownload/{phase}/{year}/{quarter}/{month}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public void downloadBHUReport(HttpSession session, HttpServletResponse response, 
			@PathVariable("phase") String filterPhase,
			@PathVariable("year") String filterYear, 
			@PathVariable("quarter") String filterQuarter,
			@PathVariable("month") String filterMonth) throws Exception 
	{
		LOG.info("downloadBHUReport method invoked.");
		reportsSvc.downloadBHUReport(session, filterPhase, filterYear, filterQuarter, filterMonth, response);

	}
	
	//Link for BHU Ticket Details Report
	@RequestMapping(value = "/BHUTicketsDownload/{bhuID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public void downloadBHUTicketsReport(HttpSession session, HttpServletResponse response, 
			@PathVariable("bhu-ID") String bhuID) throws Exception 
	{
		LOG.info("downloadBHUReport method invoked.");
		reportsSvc.downloadBHUTicketDetails(session, bhuID, response);

	}
	
	//Link for BHU Warranty Details Report
	@RequestMapping(value = "/BHUWarrantyDownload/{bhuID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public void downloadBHUWarrantyReport(HttpSession session, HttpServletResponse response, 
			@PathVariable("bhu-ID") String bhuID) throws Exception 
	{
		LOG.info("downloadBHUReport method invoked.");
		reportsSvc.downloadBHUWarrantyDetails(session, bhuID, response);

	}
	
	@RequestMapping(value = "/BHUEffortsDownload/{bhuID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public void downloadBHUEffortsReport(HttpSession session, HttpServletResponse response, 
			@PathVariable("bhu-ID") String bhuID,
			@RequestParam("size") String bhuSize) throws Exception 
	{
		LOG.info("downloadBHUReport method invoked.");
		reportsSvc.downloadBHUEffortsDetails(session, bhuID, bhuSize, response);

	}
	
	/**
	 * Method to handle Application Exception
	 * 
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ErrorResponse> handleApplicationException(Exception ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		if (ex instanceof DataNotFoundException) {
			error.setErrorCode(HttpStatus.NOT_FOUND.value());
		} else { 
			error.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.OK);
	}
	
}
