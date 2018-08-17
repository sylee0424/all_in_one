<?php
	private function downloadFile($url, $path)
	{
		$newfname = $path;
		$file = fopen ($url, 'rb');
		if ($file) {
			$newf = fopen ($newfname, 'wb');
			if ($newf) {
				while(!feof($file)) {
					fwrite($newf, fread($file, 1024 * 8), 1024 * 8);
				}
			}
		}
		if ($file) {
			fclose($file);
		}
		if ($newf) {
			fclose($newf);
		}
	}
	private function getpage($url)
	{
		if ($fp = fopen($url, 'r')) {
			$content = '';
			while ($line = fread($fp, 1024)) {
				$content .= $line;
			}
			return $content;
		}
		else {
			return "";
		}
	}
	
	if ($_REQUEST["target"]) {
		$id = (int)$_REQUEST["target"];
		$resstr = getpage("https://ltn.hitomi.la/galleries/".(string)$id.".js");
		mkdir("./storage/hitomi/".(string)$id,0777,true);
		if (strpos($resstr,"var")) {
			$json = json_decode(substr($resstr,18));
			$arr=array();
			foreach ($json as $value) {
				array_push($arr,$value.name);
			}
			if ($id%2 == 1) {
				$key = "ba";
			}
			else {
				$key = "aa";
			}
			$fp = fopen("./storage/hitomi/".(string)$id."index.json","wb");
			fwrite($fp,json_encode($arr));
			fclose($fp);
			$length = strlen((string)count($arr));
			foreach ($arr as $index => $value) {
				downloadFile("https://".$key."hitomi.la/galleries/".(string)$id."/".$value,"./storage/hitomi/".(string)$id."/".sprintf("%0".(string)$length."d",$index+1));
			}
			//추후 viewer.php를 추가
		}
		else {
			exit(1);
		}
	}
?>