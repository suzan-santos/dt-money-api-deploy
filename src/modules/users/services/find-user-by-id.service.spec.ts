import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from './find-user-by-id.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
  });

  describe('execute', () => {
    it('deve retornar usuário pelo ID', async () => {
      const userId = '123';
      mockRepository.findById.mockResolvedValue({
        id: '123',
        name: 'João',
        email: 'joao@email.com',
      });

      const result = await service.execute(userId);

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result.id).toBe('123');
    });
  });
});