import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from './delete-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  describe('execute', () => {
    it('deve deletar usuário com sucesso', async () => {
      const userId = '123';

      mockRepository.findById.mockResolvedValue({
        id: '123',
        name: 'João',
        email: 'joao@email.com',
      });
      mockRepository.delete.mockResolvedValue(undefined);

      await service.execute(userId);

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });
  });
});