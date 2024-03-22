QUEST_VOCACR_TRN1 = {
	title = 'IDS_PROPQUEST_INC_000479',
	character = 'MaDa_Hent',
	end_character = 'MaDa_Pyre',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCACR_BFTRN',
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
				'MI_AIBATT3'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000480',
			'IDS_PROPQUEST_INC_000481',
			'IDS_PROPQUEST_INC_000482',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000483',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000484',
		},
		completed = {
			'IDS_PROPQUEST_INC_000485',
			'IDS_PROPQUEST_INC_000486',
			'IDS_PROPQUEST_INC_000487',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000488',
		},
	}
}
