QUEST_HEROBLA_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001447',
	character = 'MaFl_Guabrill',
	end_character = 'MaFl_Ata',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROBLA_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_SCRSTAMP', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_EARRHEREN', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001448',
			'IDS_PROPQUEST_INC_001449',
			'IDS_PROPQUEST_INC_001450',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001451',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001452',
		},
		completed = {
			'IDS_PROPQUEST_INC_001453',
			'IDS_PROPQUEST_INC_001454',
			'IDS_PROPQUEST_INC_001455',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001456',
		},
	}
}
