QUEST_HEROBIL_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001505',
	character = 'MaFl_Domek',
	end_character = 'MaFl_Segho',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HEROBIL_TRN2',
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
			{ id = 'II_SYS_SYS_QUE_DOCHALL', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001506',
			'IDS_PROPQUEST_INC_001507',
			'IDS_PROPQUEST_INC_001508',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001509',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001510',
		},
		completed = {
			'IDS_PROPQUEST_INC_001511',
			'IDS_PROPQUEST_INC_001512',
			'IDS_PROPQUEST_INC_001513',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001514',
		},
	}
}
