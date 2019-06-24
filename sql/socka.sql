/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : socka

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 24/06/2019 18:09:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for k_users
-- ----------------------------
DROP TABLE IF EXISTS `k_users`;
CREATE TABLE `k_users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户姓名',
  `sex` tinyint(255) NULL DEFAULT NULL COMMENT '【1--男】【0-女】',
  `age` tinyint(3) NULL DEFAULT NULL COMMENT '用户年龄',
  `iphone` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户手机号码',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户地址',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `registerTime` datetime(0) NULL DEFAULT NULL COMMENT '注册日期',
  `loginTime` datetime(0) NULL DEFAULT NULL COMMENT '登陆日期\r\n',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456' COMMENT '登陆密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_users
-- ----------------------------
INSERT INTO `k_users` VALUES (1, 'krui', 1, 29, '13212312312', '湖北天门', NULL, NULL, NULL, '123456');
INSERT INTO `k_users` VALUES (2, 'qq', 0, 18, '12312312312', '湖北武汉', NULL, NULL, NULL, '123456');
INSERT INTO `k_users` VALUES (3, 'ww', 1, 22, '12312312343', '湖北荆门', NULL, NULL, NULL, '123456');
INSERT INTO `k_users` VALUES (4, 'ee', 0, 20, '18612312332', '湖北黄冈', NULL, NULL, NULL, '123456');
INSERT INTO `k_users` VALUES (5, '张三', 0, 32, '13512312332', '广东广州', NULL, NULL, NULL, '123456');
INSERT INTO `k_users` VALUES (6, '李四', 0, 14, '18712312345', '广东深圳', NULL, NULL, NULL, '123456');

SET FOREIGN_KEY_CHECKS = 1;
