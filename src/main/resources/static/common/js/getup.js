// 每日签到
        public function dailySign(){
            // 获取用户签到信息
            $merArr = M('merchant') -> where("MerID = '$this->UserId'") -> find();
            // 判断是否为注册后第一次签到
            if($merArr['totalTime'] == 0 && $merArr['totalnum'] == 0){
                // 获取签到设置
                $signArr = M('sign') -> where("num = 1") -> find();
                $Yunbi = $signArr['yun'];
                $score['Mertotal'] = array('exp',"Mertotal + $Yunbi");
                $score['totalnum'] = 1;
                $score['totalTime'] = time();
                $result = M('merchant') -> where("MerID = '$this->UserId'") -> save($score);
                if($result > 0){
                    echo "签到成功";
                }else{
                    echo "签到失败";
                }
            }else{
                // 获取登录用户签到信息
                $totalTime = $merArr['totalTime']; // 签到时间
                $totalnum = $merArr['totalnum']; // 签到次数
                $signTime = date('y-m-d',$totalTime); // 格式化签到时间
                // 判断今天是否已经签到
                if($signTime == date('y-m-d',time())){
                    echo "已签到";
                    exit;
                }else{
                    // 判断是否错过连续签到时间
                    if(time() - $totalTime > 60*60*24){
                        // 获取签到设置
                        $signArr = M('sign') -> where("num = 1") -> find();
                        $Yunbi = $signArr['yun'];
                        $score['Mertotal'] = array('exp',"Mertotal + $Yunbi");
                        $score['totalnum'] = 1;
                        $score['totalTime'] = time();
                        $result = M('merchant') -> where("MerID = '$this->UserId'") -> save($score);
                        if($result > 0){
                            echo "签到成功";
                        }else{
                            echo "签到失败";
                        }
                    }else{
                        // 获取签到设置
                        $signArr = M('sign') -> where("num = $totalnum + 1") -> find();
                        if($signArr != null){
                            $Yunbi = $signArr['yun'];
                        }else{
                            $maxYun = M('sign') -> Max('num');
                            $signArr = M('sign') -> where("num = $maxYun") -> find();
                            $Yunbi = $signArr['yun'];
                        }
                        $score['Mertotal'] = array('exp',"Mertotal + $Yunbi");
                        $score['totalnum'] = $totalnum + 1;
                        $score['totalTime'] = time();
                        $result = M('merchant') -> where("MerID = '$this->UserId'") -> save($score);
                        if($result > 0){
                            echo "签到成功";
                        }else{
                            echo "签到失败";
                        }
                    }    
                }
            }
        }
