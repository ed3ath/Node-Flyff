QUEST_VOCMAG_TRN1 = {
	title = 'IDS_PROPQUEST_INC_000783',
	character = 'MaSa_Wingyei',
	end_character = 'MaSa_Hee',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMAG_BFTRN',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_BLI_BLI_FLARIS', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_TWINKLESTONE', quantity = 10, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_GEN_GEM_GEM_TWINKLESTONE',
			probability = '3000000000',
			monsters = {
				'MI_AIBATT1',
				'MI_AIBATT2',
				'MI_AIBATT3',
				'MI_AIBATT4'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000784',
			'IDS_PROPQUEST_INC_000785',
			'IDS_PROPQUEST_INC_000786',
			'IDS_PROPQUEST_INC_000787',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000788',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000789',
		},
		completed = {
			'IDS_PROPQUEST_INC_000790',
			'IDS_PROPQUEST_INC_000791',
			'IDS_PROPQUEST_INC_000792',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000793',
		},
	}
}
