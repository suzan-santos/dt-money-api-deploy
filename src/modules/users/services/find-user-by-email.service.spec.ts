import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailService } from './find-user-by-email.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
  });

  describe('execute', () => {
    it('deve retornar usuário pelo email', async () => {
      const email = 'joao@email.com';
      mockRepository.findByEmail.mockResolvedValue({
        id: '123',
        name: 'João',
        email: 'joao@email.com',
      });

      const result = await service.execute(email);

      expect(mockRepository.findByEmail).toHaveBeenCalledWith('joao@email.com');
      expect(result.email).toBe('joao@email.com');
    });
  });
});