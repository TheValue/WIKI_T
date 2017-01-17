package com.koreaap.mouInfo.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.mouInfo.persistence.IndexMapper;

@Controller
public class IndexController {
	private Logger log = Logger.getLogger(this.getClass());
    
	@Autowired
	private IndexMapper indexMapper;
	
	@RequestMapping("/findStdDate")
	@ResponseBody
	public Map findStdDate() {
		Map<String, Object> map = indexMapper.findStdDate();
		return map;
	}
	
	@RequestMapping("/findYtm")
	@ResponseBody
	public Map findYtm(@RequestBody Map<String,Object> param) {
		
		List<Map<String, Object>> list = indexMapper.findYtm(param);
		
		return convertDhtmlxGridJsonObj(list);
	}
	
	@RequestMapping("/findSpot")
	@ResponseBody
	public Map findSpot(@RequestBody Map<String,Object> param) {
		
		List<Map<String, Object>> list = indexMapper.findSpot(param);
		
		return convertDhtmlxGridJsonObj(list);
	}
	
	@RequestMapping("/findCdCp")
	@ResponseBody
	public Map findCdCp(@RequestBody Map<String,Object> param) {
		
		List<Map<String, Object>> list = indexMapper.findCdCp(param);
		
		return convertDhtmlxGridJsonObj(list);
	}
	
	@RequestMapping("/findYieldCurve")
	@ResponseBody
	public Map findYieldCurve(@RequestBody Map<String,Object> param) {
		
		List<Map<String, Object>> list = indexMapper.findYieldCurve(param);
		List<Map<String, Object>> listUsd = indexMapper.findYieldCurveUsd(param);
		
		return convertDhtmlxGridJsonObj(list, listUsd);
	}
	
	@RequestMapping("/findSwapRate")
	@ResponseBody
	public Map findSwapRate(@RequestBody Map<String,Object> param) {
		
		List<Map<String, Object>> list = indexMapper.findSwapRate(param);
		
		return convertDhtmlxGridJsonObj(list);
	}
	
	/**
	 *	LinkedHashMap 으로 return 받은 경우에 아래와 같이 values 를 이용하여 map 형태로 전달 
	 */
	private Map convertDhtmlxGridJsonObj(List<Map<String, Object>> list) {
		Map response = new HashMap<String, List>();
		
		List resList = new ArrayList();
		
		for(int i=0; i<list.size(); i++) {
			Map map = new HashMap();
			map.put("id", i+1);
			map.put("data", list.get(i).values());
			
			resList.add(map);
		}
		
		response.put("result", "success");
		response.put("rows", resList);
		return response;
	}
	
	private Map convertDhtmlxGridJsonObj(List<Map<String, Object>> list, List<Map<String, Object>> list2) {
		Map response = new HashMap<String, List>();
		
		List resList = new ArrayList();
		
		int pos = 1;
		for(int i=0; i<list.size(); i++) {
			Map map = new HashMap();
			
			if(list.get(i).get("MATRIX_ID").equals("UST00")) {
				map.put("id", pos++);
				map.put("data", list.get(i).values());
				
				resList.add(map);
			}
		}
		
		for(int i=0; i<list2.size(); i++) {
			Map map = new HashMap();
			map.put("id", pos++);
			map.put("data", list2.get(i).values());
			
			resList.add(map);
		}
		
		response.put("result", "success");
		response.put("rows", resList);
		return response;
	}
	
}
