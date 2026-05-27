import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  describe('execute', () => {
    it('deve atualizar usuário com sucesso', async () => {
      const userId = '123';
      const updateUserDTO = {
        name: 'João Atualizado',
        email: 'joao.novo@email.com',
        password: 'nova_senha',
      };

      mockRepository.findById.mockResolvedValue({
        id: '123',
        name: 'João',
        email: 'joao@email.com',
        password: 'hash_antigo',
      });
      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({
        id: '123',
        name: 'João Atualizado',
        email: 'joao.novo@email.com',
      });

      const result = await service.execute(userId, updateUserDTO);

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(mockRepository.update).toHaveBeenCalled();
      expect(result.name).toBe('João Atualizado');
    });
  });
});