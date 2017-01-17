package com.koreaap.mouInfo.persistence;

import java.util.List;
import java.util.Map;

public interface IndexMapper {
	List<Map<String, Object>> findYtm(Map<String, Object> param);
	List<Map<String, Object>> findSpot(Map<String, Object> param);
	List<Map<String, Object>> findCdCp(Map<String, Object> param);
	List<Map<String, Object>> findYieldCurve(Map<String, Object> param);
	List<Map<String, Object>> findYieldCurveUsd(Map<String, Object> param);
	List<Map<String, Object>> findSwapRate(Map<String, Object> param);
	Map<String, Object> findStdDate();
}
