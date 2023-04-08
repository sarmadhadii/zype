import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { WordsService } from 'src/app/services/words.service';
import { wordsServiceStub } from 'src/app/stubs/wordsServiceStub';
import { UserService } from 'src/app/services/user.service';
import { userServiceStub } from 'src/app/stubs/userServiceStub';
import { LoaderService } from 'src/app/services/loader.service';
import { loaderServiceStub } from 'src/app/stubs/loaderServiceStub';
import { FormsModule } from '@angular/forms';

describe('TestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [
                { provide: WordsService, useFactory: () => wordsServiceStub },
                { provide: UserService, useFactory: () => userServiceStub },
                { provide: LoaderService, useFactory: () => loaderServiceStub }
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
