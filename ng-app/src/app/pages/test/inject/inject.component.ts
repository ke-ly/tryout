import { Component, Inject, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, interval, Observable, of, Subject, Subscription, } from 'rxjs';
import { catchError, delay, map, switchMap, takeWhile, tap, timeout, filter, } from 'rxjs/operators';
import { appVersion } from 'src/app/app.module';
import { HttpRes } from 'src/app/interceptors';
import { Confirmable, Emoji } from 'src/app/core';
import { Account, StoreService } from 'src/app/services';


export enum userSf {
    user = 0,
    admin = 1,
    sub = 2,
    super = 3,
}

@Component({
    selector: 'app-inject',
    templateUrl: './inject.component.html',
    styleUrls: ['./inject.component.less']
})
export class InjectComponent implements OnInit {


    @Emoji() name: string = 'maomao'
    public endDate = new Date('2021-11-11 15:04:02')
    public money = '125743'
    public obj = {
        name: "maomao",
        age: 15,
        likes: ['吃饭', '睡觉', '打豆豆']
    }
    public object: { [key: number]: string } = { 1: '吃饭', 2: '睡觉', 3: '打豆豆' }
    public map = new Map([[2, 'foo'], [1, 'bar'], [3, '这是value']])
    public percent = 0.618321
    public timeout$ = interval(1000)
    public username = 'v-model'
    public user$: Observable<Account | undefined> | undefined
    public currentUrl$: Observable<string> | undefined
    public conter$: Subject<number> | undefined
    public counter: number | undefined



    public userSf = userSf
    public sf: userSf = userSf.sub
    public yjMoney: number = 156.664
    public account: Account | undefined
    public flag: boolean = true
    public count: number = 0
    public timer: ReturnType<typeof setInterval> | undefined
    public store$: Subscription | undefined

    @ViewChild('acc', { static: true }) myacc: ElementRef<HTMLDivElement> | undefined


    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    ngAfterViewInit() {
        // dom 加载完成

        //原生的方式
        const dom = <HTMLDivElement>document.getElementById('flag')
        dom.style.color = 'red'
        console.log(dom);

        //viewChildref
        const vc = this.myacc?.nativeElement
        console.log(vc);
    }

    calculate() {
        this.yjMoney = Math.random() * 100
        this.store.fetchJsonServer()
    }

    increaseCounter() {
        this.store.increaseCounter()
    }

    constructor(
        @Inject(appVersion) public version: string,
        private route: ActivatedRoute,
        private router: Router,
        private store: StoreService) {

    }

    ngOnInit(): void {

        const route$ = this.route.paramMap
        const routerSubs = route$.subscribe(route => {
            console.log('routerSubs,id', route.get('id'));
        })

        this.user$ = route$.pipe(
            map(r => r.get('id')),
            switchMap(id => this.store.fetchUserByid(id!).pipe(map(i => {
                return i.find(f => f.id === Number(id))
            }))),
        )
        // this.store.subject$.next(2)
        this.store.subject$.subscribe(d => {
            console.log(d, '===');
            this.counter = d
        })
        // this.testSwitchMap()

        this.currentUrl$ = this.router.events.pipe(
            filter((f): f is NavigationEnd => f instanceof NavigationEnd),
            map((f: NavigationEnd) => f.url),
        )

        this.store$ = this.store.subject$.subscribe((c) => {
            this.count = c
        })
    }

    changeCounter() {
        this.store.increaseCounter()
    }

    testSwitchMap() {
        const counter$ = interval(1000)
        const click$ = fromEvent(document, 'click').pipe(
            switchMap(c => counter$)
        ).subscribe(c => {
            console.log(`距离上次点击:${c}秒了`)
        })
    }


    changeName() {
        this.name = this.name.includes('jack') ? 'maomao' : 'jack'
    }

    @Confirmable('确认要提交吗？')
    showConfirmable() {
        console.log('这个答案是要在装饰器的confirm确认过后才可以看到', this)
    }

    testTimeout() {
        this.timeout$.pipe(
            timeout(new Date('2021-10-22 11:42:30')),
            catchError((err: any) => {
                console.log(err);
                return of(`接受到一个错误：${err}`)
            }),
            tap(console.log)
        )
    }

    /**
     * 大数相加
     * 不能用bigInt
     * @param a 一个大数字
     * @param b 一个大数字
     */
    bigIntSum(a: string, b: string): string {
        const arrA = a.split('')
        const arrB = b.split('')
        const lenA = arrA.length
        const lenB = arrB.length
        const maxLen = Math.max(lenA, lenB)
        const res: number[] = []
        let isBigThanTen = false

        for (let i = 0; i < maxLen; i++) {
            let temp: number = 0

            let lastA = arrA.pop() || '0'
            let lastB = arrB.pop() || '0'
            temp = parseInt(lastA) + parseInt(lastB)
            if (isBigThanTen) {
                temp = temp + 1
            }

            if (Math.floor(temp / 10) > 0) {
                // 需要进位
                temp = temp % 10
                isBigThanTen = true
            } else {
                isBigThanTen = false
            }

            res.push(temp)

            if (i === maxLen - 1 && isBigThanTen) {
                res.push(1)
            }

        }

        return res.reverse().join('')
    }



}

