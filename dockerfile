# 使用官方 Node.js 镜像作为基础镜像
FROM node:20.15.1 AS frontend-build

# 设置工作目录
WORKDIR /app/frontend
# 复制 package.json 和 package-lock.json 并安装依赖
COPY ExcelUpload/package*.json .
RUN npm install

# 复制所有文件到当前工作目录
COPY ExcelUpload/ .
RUN npm run build
# 启动4300端口
# EXPOSE 4300
# RUN  npm run start

#####第二阶段-后端
# 使用官方 Node.js 镜像作为基础镜像
FROM node:20.15.1 AS end-build

WORKDIR /app/backend
COPY excel-upload-server/package*.json .
RUN npm install
COPY excel-upload-server/ .
COPY --from=frontend-build /app/frontend/dist/excel-upload/browser ./browser
# 暴露 NestJS 默认的端口
EXPOSE 3000
# 启动 NestJS 应用
CMD ["npm", "run", "start:prod"]
