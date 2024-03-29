import { NgModule, InjectionToken, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import zh from "@angular/common/locales/zh-Hans";

import { AppComponent } from "src/app/app.component";
import { AuthGuard } from "src/app/guard/auth.guard";
import { CoreModule } from "src/app/core/core.module";
import { NotfoundComponent } from "src/app/core/components";

import { RequestInterceptor, ResponseInterceptor } from "src/app/interceptors";
import { registerLocaleData } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

/**
 * ng 路由创建
 * 一个模块一个模块的按需懒加载，而不是每个页面加载一下
 * 一级(module)路由：
 * `ng generate module pages/data --route data --module app.module`
 *                     文件位置                 路由前缀
 *
 * 1、`ng generate module pages/project --routing`
 * 2、`ng g c pages/project/list -m project.module`
 *
 * 子级路由：
 * `ng g c pages/data/xiaoqu --m pages/data/data.module`
 *  然后再 data.module 中指定path
 *
 */

const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import("./pages/home/home.module").then((m) => m.HomeModule),
		canActivate: [AuthGuard],
	},
	{ path: "404", component: NotfoundComponent },

	{
		path: "passport",
		loadChildren: () =>
			import("./pages/passport/passport.module").then((m) => m.PassportModule),
	},
	{
		path: "project",
		loadChildren: () =>
			import("./pages/project/project.module").then((m) => m.ProjectModule),
		canActivate: [AuthGuard],
	},
	{
		path: "form",
		loadChildren: () =>
			import("./pages/form/form.module").then((m) => m.FormModule),
		canActivate: [AuthGuard],
	},
	{
		path: "account",
		loadChildren: () =>
			import("./pages/account/account.module").then((m) => m.AccountModule),
		canActivate: [AuthGuard],
	},
	{
		path: "test",
		loadChildren: () =>
			import("./pages/test/test.module").then((m) => m.TestModule),
	},
	{ path: "**", redirectTo: "/404", pathMatch: "full" },
];

export const appVersion = new InjectionToken<string>("version");

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		CoreModule,

		BrowserAnimationsModule,
	],
	declarations: [AppComponent],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: "zh-Hans",
		},
		{
			provide: HTTP_INTERCEPTORS,
			multi: true,
			useClass: RequestInterceptor,
		},
		{
			provide: HTTP_INTERCEPTORS,
			multi: true,
			useClass: ResponseInterceptor,
		},
		{
			provide: appVersion,
			useValue: "2020",
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor() {
		registerLocaleData(zh, "zh-Hans");
	}
}
